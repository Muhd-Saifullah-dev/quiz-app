import arcjet, { tokenBucket } from "@arcjet/next"

export const aj = arcjet({
    key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
    rules: [
      // Create a token bucket rate limit. Other algorithms are supported.
      tokenBucket({
        mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
        refillRate: 2, // refill 5 tokens per interval
        interval: 10, // refill every 10 seconds
        capacity: 20, // bucket maximum capacity of 10 tokens
      }),
    ],
  });