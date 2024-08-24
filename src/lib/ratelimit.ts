const rateLimitStore: Record<string, number> = {}; // To track last request time by IP

const RATE_LIMIT_INTERVAL_MS = 3000; // 3 seconds

export const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const lastRequestTime = rateLimitStore[ip];

  if (!lastRequestTime || now - lastRequestTime >= RATE_LIMIT_INTERVAL_MS) {
    rateLimitStore[ip] = now;
    return false;
  }

  return true;
};