'use client';

import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function Home() {
  const curlCommand = `
curl -X POST https://ordox.vercel.app/api/json \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": "My name is Harsh",
    "format": {
      "name": {"type": "string"}
    }
  }'
  `;

  const pythonCode = `
import requests

url = 'https://ordox.vercel.app/api/json'

data = {
    'data': 'My name is Harsh',
    'format': {
        'name': {'type': 'string'}
    }
}

headers = {
    'Content-Type': 'application/json'
}

response = requests.post(url, json=data, headers=headers)

if response.status_code == 200:
    print('Response:', response.json())
else:
    print('Failed to post data:', response.status_code, response.text)
  `;

  const jsCode = `
const url = 'https://ordox.vercel.app/api/json';

const data = {
  data: 'My name is Harsh',
  format: {
    name: { type: 'string' }
  }
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
`;

  const rubyCode = `
require 'net/http'
require 'json'
require 'uri'

url = URI.parse('https://ordox.vercel.app/api/json')
http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Post.new(url.request_uri)
request['Content-Type'] = 'application/json'
request.body = {
  'data' => 'My name is Harsh',
  'format' => {
    'name' => { 'type' => 'string' }
  }
}.to_json

response = http.request(request)

if response.is_a?(Net::HTTPSuccess)
  puts "Response: #{response.body}"
else
  puts "Failed to post data: #{response.code} #{response.message}"
end
  `;

  const javaCode = `
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class Main {
    public static void main(String[] args) {
        try {
            URL url = new URL("https://ordox.vercel.app/api/json");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            String jsonInputString = "{\"data\": \"My name is Harsh\", \"format\": {\"name\": {\"type\": \"string\"}}}";

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int code = connection.getResponseCode();
            System.out.println("Response Code: " + code);
            // Add code to handle the response if needed
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

  `;

  const phpCode = `
<?php

$url = 'https://ordox.vercel.app/api/json';
$data = [
    'data' => 'My name is Harsh',
    'format' => [
        'name' => ['type' => 'string']
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($httpCode === 200) {
    echo "Response: " . $response;
} else {
    echo "Failed to post data: HTTP Code " . $httpCode;
}

curl_close($ch);

  `;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
  <Button variant="outline" className="rounded-full mb-7 text-sm p-5 text-zinc-400">
    <Link href="https://github.com/harshsbhat/ordox" passHref
        target="_blank"
        rel="noopener noreferrer"
        className="text-zinc-400 hover:text-zinc-300"
      >
        Star OrdoX on&nbsp;<span className="text-zinc-200">Github ⭐</span>
    </Link>
  </Button>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-b from-zinc-200 to-zinc-400 text-transparent bg-clip-text text-center">
        Convert any data to JSON
      </h1>
      <p className="text-zinc-500 leading-7 [&:not(:first-child)]:mt-6 text-center">
        Easily transform your data into clean JSON with just a few clicks. Input your data and format, and let OrdoX handle the rest. <br />
        Quick, simple, and efficient data conversion for developers.
      </p>

      <Tabs defaultValue="curl" className="w-full max-w-5xl mt-10">
        <TabsList>
          <TabsTrigger value="curl">cURL</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
          <TabsTrigger value="ruby">Ruby</TabsTrigger>
          <TabsTrigger value="java">Java</TabsTrigger>
          <TabsTrigger value="php">PHP</TabsTrigger>
        </TabsList>
        <TabsContent value="curl">
          <div className="bg-zinc-900 text-zinc-400 p-6 rounded-lg relative">
            <pre>
              <code>{curlCommand}</code>
            </pre>
            <CopyButton text={curlCommand} />
          </div>
        </TabsContent>
        <TabsContent value="python">
          <div className="bg-zinc-900 text-zinc-400 p-6 rounded-lg relative">
            <pre>
              <code>{pythonCode}</code>
            </pre>
            <CopyButton text={pythonCode} />
          </div>
        </TabsContent>
        <TabsContent value="js">
          <div className="bg-zinc-900 text-zinc-400 p-6 rounded-lg relative">
            <pre>
              <code>{jsCode}</code>
            </pre>
            <CopyButton text={jsCode} />
          </div>
        </TabsContent>
        <TabsContent value="ruby">
          <div className="bg-zinc-900 text-zinc-400 p-6 rounded-lg relative">
            <pre>
              <code>{rubyCode}</code>
            </pre>
            <CopyButton text={rubyCode} />
          </div>
        </TabsContent>
        <TabsContent value="java">
          <div className="bg-zinc-900 text-zinc-400 p-6 rounded-lg relative">
            <pre>
              <code>{javaCode}</code>
            </pre>
            <CopyButton text={javaCode} />
          </div>
        </TabsContent>
        <TabsContent value="php">
          <div className="bg-zinc-900 text-zinc-400 p-6 rounded-lg relative">
            <pre>
              <code>{phpCode}</code>
            </pre>
            <CopyButton text={phpCode} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-row justify-center mt-10 space-x-12">
        <p className="text-zinc-400 font-medium text-lg">✅ Data Extraction</p>
        <p className="text-zinc-400 font-medium text-lg">✅ Web Scraping</p>
        <p className="text-zinc-400 font-medium text-lg">✅ Email Processing</p>
      </div>
    </main>
  );
}
