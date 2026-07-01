import type { NextFunction, Request, Response } from "express";

// Simple in-memory sliding-window limiter standing in for the API Gateway
// throttling described in docs/design/04-infra-design.md (10 req/min/IP).
// Fine for a single local/dev process; a real deployment relies on API
// Gateway's built-in throttling instead of in-process state.
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

const requestLog = new Map<string, number[]>();

export function rateLimiter(req: Request, res: Response, next: NextFunction): void {
  const key = req.ip ?? "unknown";
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({ error: "Too many requests. Please try again shortly." });
    return;
  }

  recent.push(now);
  requestLog.set(key, recent);
  next();
}
