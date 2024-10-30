'use client'
import HankoAuth from "@/components/HankoAuth";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="absolute top-4 left-4 px-4 py-2 cursor-pointer"
        onClick={() => router.push('/')}
      >
        Back
      </div>
      <HankoAuth />
    </div>
  );
}
