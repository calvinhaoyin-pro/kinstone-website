# Kinstone Website

Company website for Kinstone — a steel structure company transitioning from a traditional Chinese manufacturer into an international steel manufacturing and trading company.

**Stage scope:** information-focused site with bilingual (EN/ZH) content. Visitors use Contact Us for general questions, quote requests, and inventory checks. No order/transaction flows at this stage.

## Project Structure

```
kinstone-website/
  docs/design/     Design documentation (architecture, API, UI, infra)
  frontend/        React + Vite application
  backend/         Minimal Express/TypeScript Inquiry Service API
  README.md
```

## Design Docs

| Doc | Description |
|---|---|
| [00-overview.md](docs/design/00-overview.md) | Project overview and architecture |
| [01-backend-architecture.md](docs/design/01-backend-architecture.md) | Inquiry service design |
| [02-api-registry.md](docs/design/02-api-registry.md) | API endpoint reference |
| [02-openapi.yaml](docs/design/02-openapi.yaml) | OpenAPI 3.0 spec |
| [03-ui-design.md](docs/design/03-ui-design.md) | Visual direction and page wireframes |
| [04-infra-design.md](docs/design/04-infra-design.md) | AWS infrastructure design |

## Frontend

React + Vite + TypeScript with Tailwind CSS, Framer Motion, and bilingual i18n (English/Chinese).

### Pages

- **Home** — hero, value props, featured products and portfolio teasers
- **Products** — product catalog grid (static data)
- **Portfolio** — project showcase (static data)
- **About** — company story, timeline, values
- **Contact** — inquiry form (general / quote / inventory check)

### Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
cd frontend
npm run build
npm run preview
```

## Backend

A minimal Express + TypeScript implementation of the Inquiry Service from
[`01-backend-architecture.md`](docs/design/01-backend-architecture.md) — `POST /api/inquiries` and
`GET /api/health`. Deploys to **AWS Lambda** behind API Gateway (`src/lambda.ts`), with **SES** for
email; the same Express app also runs locally via plain `app.listen()` (`src/server.ts`). Inquiry
logging (DynamoDB) is an optional stub, skipped for v1 — email is the source of truth. See
[`backend/README.md`](backend/README.md) for local dev and Lambda deploy instructions.

```bash
cd backend
npm install
npm run dev
```

Runs at [http://localhost:4000](http://localhost:4000).

### Running the full stack locally

Start the backend first, then the frontend in a separate terminal — the Contact page calls the
backend directly (`VITE_API_BASE_URL`, defaults to `http://localhost:4000`):

```bash
# terminal 1
cd backend && npm install && npm run dev

# terminal 2
cd frontend && npm install && npm run dev
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion |
| i18n | Lightweight custom React context (EN / ZH), persisted to `localStorage` |
| Routing | react-router-dom |
| Backend | Node.js/TypeScript, Express, zod — deploys to AWS Lambda (bundled with esbuild) |
| Infra | Frontend: S3 + CloudFront. Backend: API Gateway + Lambda + SES. DynamoDB optional, not used in v1. No IaC — manual/CLI deploy. |

### Note on `npm install`

This machine's global `~/.npmrc` points at a corporate proxy/registry that may not be reachable on every network. `frontend/.npmrc` and `backend/.npmrc` each pin their project to the public npm registry with no proxy so `npm install` works regardless of the global config. Delete them if you'd rather inherit your machine's normal npm settings.

## Placeholder Content

All product, portfolio, and company content is placeholder data marked with `[TODO]` where applicable. Replace with real content in:

- `frontend/src/data/products.json`
- `frontend/src/data/portfolio.json`
- `frontend/src/i18n/en.json` and `frontend/src/i18n/zh.json`
