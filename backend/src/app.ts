import express, { type Express } from "express";
import cors from "cors";
import { healthRouter } from "./routes/health.js";
import { inquiriesRouter } from "./routes/inquiries.js";
import { errorHandler } from "./middleware/errorHandler.js";

const CORS_ORIGIN = process.env.CORS_ORIGIN ?? "http://localhost:5173";

export function createApp(): Express {
  const app = express();

  app.use(cors({ origin: CORS_ORIGIN }));
  app.use(express.json());

  app.use("/api", healthRouter);
  app.use("/api", inquiriesRouter);

  app.use(errorHandler);

  return app;
}
