import type { NextFunction, Request, Response } from "express";

// Catch-all handler — never leak internal error details to the client,
// per the "Error handling" row in docs/design/01-backend-architecture.md.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  console.error("[unhandled error]", err);

  if (res.headersSent) {
    return;
  }

  res.status(500).json({ error: "Internal server error" });
}
