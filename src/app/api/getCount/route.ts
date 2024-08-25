import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export const GET = async (request: NextRequest) => {
  try {
    const count = await redis.get('count');
    console.log(count);
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
};

