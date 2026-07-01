import { configure } from "@codegenie/serverless-express";
import { createApp } from "./app.js";

// Entry point for the API Gateway (HTTP API) + Lambda deployment described
// in docs/design/04-infra-design.md. Wraps the same Express app used by
// `server.ts` for local dev — route/middleware logic never changes between
// the two, only how the process is invoked.
const app = createApp();

export const handler = configure({ app });
