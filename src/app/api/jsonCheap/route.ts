import { openai } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";
import { ZodTypeAny, z } from "zod";
import { EXAMPLE_ANSWER, EXAMPLE_PROMPT } from "../../../lib/example";
import { unkey } from "@/lib/unkey"
import redis from "@/lib/redis";

const determineSchemaType = (schema: any): string => {
  if (!schema.hasOwnProperty("type")) {
    if (Array.isArray(schema)) {
      return "array";
    } else {
      return typeof schema;
    }
  }
  return schema.type;
};

const jsonSchemaToZod = (schema: any): ZodTypeAny => {
  const type = determineSchemaType(schema);

  switch (type) {
    case "string":
      return z.string().nullable();
    case "number":
      return z.number().nullable();
    case "boolean":
      return z.boolean().nullable();
    case "array":
      return z.array(jsonSchemaToZod(schema.items)).nullable();
    case "object":
      const shape: Record<string, ZodTypeAny> = {};
      for (const key in schema) {
        if (key !== "type") {
          shape[key] = jsonSchemaToZod(schema[key]);
        }
      }
      return z.object(shape);
    default:
      throw new Error(`Unsupported schema type: ${type}`);
  }
};

type PromiseExecutor<T> = (
  resolve: (value: T) => void,
  reject: (reason?: any) => void
) => void;

class RetryablePromise<T> extends Promise<T> {
  static async retry<T>(
    retries: number,
    executor: PromiseExecutor<T>
  ): Promise<T> {
    return new RetryablePromise<T>(executor).catch((error) => {
      console.error(`Retrying due to error: ${error}`);
      return retries > 0
        ? RetryablePromise.retry(retries - 1, executor)
        : RetryablePromise.reject(error);
    });
  }
}

const getClientIp = (req: NextRequest): string => {
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    if (ip.startsWith("::ffff:")) {
      return ip.slice(7); 
    }
    return ip;
  };

export const POST = async (req: NextRequest) => {

  const ip = getClientIp(req);

  // Check the rate limit
  const rateLimitResponse = await unkey.limit(ip, { cost: 2 });

  // If the rate limit is exceeded, respond with an error
  if (!rateLimitResponse.success) {
    return NextResponse.json(
      { message: "Rate limit exceeded. Please try again later." },
      { status: 429 }
    );
  }


  // Increment the request count in Redis
  let count = await redis.get('count');
  redis.incr('count');
  
  const body = await req.json();
  const genericSchema = z.object({
    data: z.string(),
    format: z.object({}).passthrough(),
  });

  const { data, format } = genericSchema.parse(body);
  const dynamicSchema = jsonSchemaToZod(format);

  const content = `DATA: \n"${data}"\n\n-----------\nExpected JSON format: ${JSON.stringify(
    format,
    null,
    2
  )}\n\n-----------\nValid JSON output in expected format:`;

  const validationResult = await RetryablePromise.retry<string>(
    3,
    async (resolve, reject) => {
      try {
        const res = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "assistant",
              content:
                "You are an AI that converts unstructured data into the attached JSON format. You respond with nothing but valid JSON based on the input data. Your output should DIRECTLY be valid JSON, nothing added before or after. You will begin right with the opening curly brace and end with the closing curly brace. Only if you absolutely cannot determine a field, use the value null.",
            },
            {
              role: "user",
              content: EXAMPLE_PROMPT,
            },
            {
              role: "system",
              content: EXAMPLE_ANSWER,
            },
            {
              role: "user",
              content,
            },
          ],
        });

        const text = res.choices[0].message.content;

        const validationResult = dynamicSchema.parse(JSON.parse(text || ""));

        return resolve(validationResult);
      } catch (err) {
        reject(err);
      }
    }
  );

  return NextResponse.json(validationResult, { status: 200 });
};