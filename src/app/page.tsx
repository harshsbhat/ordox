'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/ui/copy';
import Link from 'next/link';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AnimatedCount from '@/components/animatedCount'; // Import the AnimatedCount component

export default function Home() {
  const [count, setCount] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch('/api/getCount');
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    }

    fetchCount();
  }, []);

  const standardCommand = `
curl -X POST https://ordox.vercel.app/api/json \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": "My name is Harsh",
    "format": {
      "name": {"type": "string"}
    }
  }'
  `;

  const cheapCommand = `
curl -X POST https://ordox.vercel.app/api/jsonCheap \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": "My name is Harsh.",
    "format": {
      "name": {"type": "string"}
    }
  }'
  `;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <Button variant="outline" className="rounded-full mb-7 text-sm p-5 text-zinc-400">
        <Link href="https://github.com/harshsbhat/ordox" passHref
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-zinc-300"
          >
            Star OrdoX on&nbsp;<span className="text-zinc-200">Github ⭐</span>
        </Link>
      </Button>
      <h1 className="scroll-m-20 text-3xl md:text-4xl font-extrabold tracking-tight lg:text-6xl bg-gradient-to-b from-zinc-200 to-zinc-400 text-transparent bg-clip-text text-center">
        Convert any data to JSON
      </h1>
      <p className="text-zinc-500 leading-7 [&:not(:first-child)]:mt-6 text-center">
        Transform your data to clean JSON in just one click
      </p>
      <h2 className="relative mt-10 scroll-m-20 pb-2 text-2xl md:text-3xl font-bold tracking-tight transition-colors bg-gradient-to-b from-zinc-200 to-zinc-500 text-transparent bg-clip-text">
        Requests converted to JSON
      </h2>
      <AnimatedCount count={count} />

      <Tabs defaultValue="standard" className="w-full max-w-5xl mt-10">
        <TabsList>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="cheap">Cheap</TabsTrigger>
        </TabsList>
        <TabsContent value="standard">
          <div className="bg-zinc-900 text-zinc-400 p-6 rounded-lg relative overflow-auto">
            <pre className="whitespace-pre-wrap break-words">
              <code>{standardCommand}</code>
            </pre>
            <CopyButton text={standardCommand} />
          </div>
        </TabsContent>
        <TabsContent value="cheap">
          <div className="bg-zinc-900 text-zinc-400 p-6 rounded-lg relative overflow-auto">
            <pre className="whitespace-pre-wrap break-words">
              <code>{cheapCommand}</code>
            </pre>
            <CopyButton text={cheapCommand} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col md:flex-row justify-center mt-10 space-y-4 md:space-y-0 md:space-x-12">
        <p className="text-zinc-400 font-medium text-lg">✅ Data Extraction</p>
        <p className="text-zinc-400 font-medium text-lg">✅ Web Scraping</p>
        <p className="text-zinc-400 font-medium text-lg">✅ Email Processing</p>
      </div>
    </main>
  );
}
