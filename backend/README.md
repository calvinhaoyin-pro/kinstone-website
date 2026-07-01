# Kinstone Backend — Inquiry Service

A minimal Express + TypeScript implementation of the Inquiry Service described in
[`docs/design/01-backend-architecture.md`](../docs/design/01-backend-architecture.md). It exposes the
two endpoints from [`docs/design/02-api-registry.md`](../docs/design/02-api-registry.md):

- `POST /api/inquiries` — validate (zod), "send" a notification email, and "log" the inquiry
- `GET /api/health` — health check

Two entrypoints share the same Express app (`src/app.ts`):

- **`src/server.ts`** — plain `app.listen()`, used for local dev (`npm run dev`/`npm start`)
- **`src/lambda.ts`** — wraps the app for **API Gateway + Lambda**, per
  [`docs/design/04-infra-design.md`](../docs/design/04-infra-design.md)

Email uses real **AWS SES** (`src/services/mailer.ts`) when running in Lambda, and falls back to a
console log locally so `npm run dev` never needs AWS credentials — see `MAILER_DRIVER` in
`.env.example`. Inquiry storage (`src/services/store.ts`) is still an in-memory stub; DynamoDB is
optional and skipped for v1 (email is the source of truth).

## Getting started

```bash
npm install
cp .env.example .env   # optional, defaults work for local dev
npm run dev             # http://localhost:4000, restarts on file changes
```

## Project structure

```
backend/
  src/
    server.ts          local dev entrypoint — app.listen()
    lambda.ts           Lambda entrypoint — wraps app for API Gateway
    app.ts              builds the Express app (routes, middleware)
    routes/
      health.ts          GET /api/health
      inquiries.ts        POST /api/inquiries
    schemas/
      inquiry.ts          zod validation schema
    services/
      mailer.ts           real SES send (Lambda) / console log (local dev)
      store.ts            DynamoDB stub — in-memory inquiry log
    middleware/
      rateLimiter.ts       10 req/min/IP in-memory limiter (dev only — API
                           Gateway throttling handles this in production)
      errorHandler.ts      catch-all 500 handler
```

## Try it

```bash
curl http://localhost:4000/api/health

curl -X POST http://localhost:4000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "type": "quote",
    "name": "John Smith",
    "company": "Acme Construction",
    "email": "john@acme.com",
    "message": "We need 500 tons of H-beam steel for a project in Q3.",
    "productInterest": "h-beam-steel",
    "locale": "en"
  }'
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Run with hot reload via `tsx watch` |
| `npm run build` | Type-check and compile to `dist/` (local server) |
| `npm start` | Run the compiled server (`dist/server.js`) |
| `npm run typecheck` | Type-check without emitting |
| `npm run build:lambda` | Bundle `src/lambda.ts` + all dependencies into `dist/lambda.cjs` (esbuild) |
| `npm run package:lambda` | `build:lambda` + zip it into `function.zip`, ready to upload |

## Deploying to Lambda

No IaC in this repo yet — deploy manually (Console or CLI) since it's a single function:

```bash
npm run package:lambda
aws lambda update-function-code \
  --function-name kinstone-inquiry-api \
  --zip-file fileb://function.zip
```

**One-time setup** (Console or CLI, not covered by this repo):

1. Create the Lambda function (Node.js 20.x runtime, handler `lambda.handler`)
2. Attach an execution role allowing `ses:SendEmail` (and `dynamodb:PutItem` only if you add the
   optional inquiry log)
3. Create an API Gateway **HTTP API** with a Lambda proxy integration (`ANY /{proxy+}`)
4. Set Lambda environment variables: `CORS_ORIGIN`, `SES_FROM_EMAIL`, `SES_TO_EMAIL`, `AWS_REGION`
5. Verify `SES_FROM_EMAIL`'s domain/address in SES, and request production access (SES starts in a
   sandbox that only allows verified recipient addresses)

The `.cjs` extension on the bundle is required: this package's `package.json` sets
`"type": "module"`, so a plain `.js` bundle would be misinterpreted as ESM by Node and silently
export nothing. `.cjs` forces CommonJS regardless of that setting.

## What this does NOT do

Per the design doc, this service intentionally has no database, auth, or admin endpoints, and does
not serve product/portfolio/about content (that's static data in `frontend/src/data/`). See
"Future Growth" in `01-backend-architecture.md` for what's explicitly out of scope.
