import { Ratelimit } from "@unkey/ratelimit"
import { Unkey } from "@unkey/api";

export const unkeyApi = new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY! });

export const unkey = new Ratelimit({
  rootKey: process.env.UNKEY_ROOT_KEY!,
  namespace: "harshbhat",
  limit: 8,
  duration: "30s",
  async: true
})
