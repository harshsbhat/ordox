'use client';

import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset button text after 2 seconds
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 flex items-center space-x-2 text-smpx-4 py-2 rounded-lg"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Clipboard className="w-4 h-4 text-white" />
      )}
      <span>{copied ? '' : ''}</span>
    </button>
  );
}
