# Backend Architecture

## Overview

At this stage the backend is a **single-purpose Inquiry Service** — one serverless function that receives contact form submissions, validates them, and emails the sales team. There is no content API, no database for products/portfolio, and no authentication.

Products, Portfolio, and About content are **static JSON files** shipped with the frontend build.

## Service: Inquiry Handler

```
API Gateway  →  Lambda (Node.js / TypeScript)  →  SES (email)
                                              →  DynamoDB (optional log)
```

### Responsibilities

1. **Validate** incoming inquiry payload (zod schema).
2. **Email** the sales team via AWS SES with inquiry details.
3. **Log** the inquiry to DynamoDB (optional, for follow-up tracking).
4. **Return** a success/error response to the frontend.

### What it does NOT do

- Serve product/portfolio/about content.
- Manage user accounts or sessions.
- Process orders or payments.
- Provide an admin interface.

## Data Model

### Inquiry

The only entity the backend handles.

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string (UUID) | auto | Generated on creation |
| `type` | enum | yes | `general` \| `quote` \| `inventory-check` |
| `name` | string | yes | Contact name |
| `company` | string | no | Company name |
| `email` | string | yes | Contact email |
| `phone` | string | no | Contact phone |
| `message` | string | yes | Inquiry message (max 2000 chars) |
| `productInterest` | string | no | Product name/slug the visitor is asking about |
| `locale` | enum | yes | `en` \| `zh` |
| `createdAt` | ISO 8601 | auto | Submission timestamp |

### DynamoDB Table (optional)

```
Table: kinstone-inquiries
  PK: id (String)
  GSI: createdAt-index (createdAt as sort key)
  TTL: none (retain for follow-up)
```

## Validation (zod)

```typescript
const InquirySchema = z.object({
  type: z.enum(["general", "quote", "inventory-check"]),
  name: z.string().min(1).max(100),
  company: z.string().max(200).optional(),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().min(1).max(2000),
  productInterest: z.string().max(200).optional(),
  locale: z.enum(["en", "zh"]),
});
```

## Cross-Cutting Concerns

| Concern | Approach |
|---|---|
| Input validation | zod schema, reject invalid payloads with 400 |
| Spam protection | Honeypot field (hidden input, reject if filled); API Gateway rate limiting (e.g. 10 req/min per IP) |
| Logging | Structured JSON logs to CloudWatch |
| Error handling | Catch-all handler returns 500 with generic message; never expose internal errors |
| Configuration | Environment variables: `SES_FROM_EMAIL`, `SES_TO_EMAIL`, `DYNAMODB_TABLE` (optional) |

## Email Template

When an inquiry is submitted, SES sends an email to the sales team:

```
Subject: [Kinstone Inquiry] {type} — {name} ({company})

Type:         {type}
Name:         {name}
Company:      {company}
Email:        {email}
Phone:        {phone}
Product:      {productInterest}
Locale:       {locale}
Message:
{message}
```

## Future Growth (not designed in detail)

If/when the company needs a real product catalog, user accounts, or order flows, that becomes a separate future-phase design. Today's architecture intentionally does not build toward it. A possible evolution path:

1. Add a headless CMS or admin CRUD for content management.
2. Introduce RDS/Postgres if relational data is needed.
3. Add authentication and order modules as a separate service.

These are explicitly deferred and should not influence current implementation decisions.
