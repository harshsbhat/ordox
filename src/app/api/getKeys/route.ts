import { NextRequest, NextResponse } from 'next/server';
import redis from "@/lib/redis";

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    const key = `api_${id}`; 
    const logs = await redis.lrange(key, 0, -1); 
    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to retrieve logs" }, { status: 500 });
  }
}
