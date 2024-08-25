import { useState, useEffect } from 'react';

interface AnimatedCountProps {
  count: number | string | null; // Allow count to be number, string, or null
}

const AnimatedCount: React.FC<AnimatedCountProps> = ({ count }) => {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = typeof count === 'number' ? count : parseInt(count as string, 10) || 0; // Convert count to number
    const duration = 2000; // Duration of the animation in milliseconds
    const stepTime = end > start ? Math.abs(Math.floor(duration / (end - start))) : 1000; // Avoid division by zero

    if (end === 0) {
      setDisplayCount(0);
      return;
    }

    const timer = setInterval(() => {
      start += 1;
      setDisplayCount(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [count]);

  return (
    <h2 className='relative mt-2 scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors bg-gradient-to-b from-zinc-200 to-zinc-500 text-transparent bg-clip-text'>
      {displayCount}
    </h2>
  );
};

export default AnimatedCount;
