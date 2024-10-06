import { Ratelimit } from "@unkey/ratelimit"

export const unkey = new Ratelimit({
  rootKey: process.env.UNKEY_ROOT_KEY!,
  namespace: "harshbhat",
  limit: 8,
  duration: "30s",
  async: true
})
