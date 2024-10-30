import { NextRequest, NextResponse } from 'next/server';
import { unkeyApi } from '@/lib/unkey';
import redis from "@/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const apiId = process.env.UNKEY_API_ID;
    const { name, id } = await request.json();
    
    const created = await unkeyApi.keys.create({
      apiId: apiId!,
      prefix: "ordox",
      name: name,
      meta: {
        userId: id,
      },
    });

    const key = `api_${id}`;
    await redis.rpush(key, created.result?.keyId);

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to create key" }, { status: 500 });
  }
}
