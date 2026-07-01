# API Registry

## Base URL

```
Production:  https://api.kinstone.com
Development: https://api-dev.kinstone.com
```

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/inquiries` | None | Submit a contact/quote/inventory inquiry |
| `GET` | `/api/health` | None | Health check |

## POST /api/inquiries

Submit a new inquiry from the Contact page.

### Request Body

```json
{
  "type": "quote",
  "name": "John Smith",
  "company": "Acme Construction",
  "email": "john@acme.com",
  "phone": "+1-555-0100",
  "message": "We need 500 tons of H-beam steel for a project in Q3.",
  "productInterest": "h-beam-steel",
  "locale": "en"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `type` | string | yes | `general`, `quote`, or `inventory-check` |
| `name` | string | yes | 1–100 chars |
| `company` | string | no | Max 200 chars |
| `email` | string | yes | Valid email |
| `phone` | string | no | Max 30 chars |
| `message` | string | yes | 1–2000 chars |
| `productInterest` | string | no | Product slug or free-text reference |
| `locale` | string | yes | `en` or `zh` |

### Responses

**201 Created**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "message": "Inquiry submitted successfully"
}
```

**400 Bad Request** — validation failure

```json
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Invalid email address" }
  ]
}
```

**429 Too Many Requests** — rate limit exceeded

**500 Internal Server Error** — server-side failure

## GET /api/health

Simple health check for monitoring and CI/CD smoke tests.

### Response

**200 OK**

```json
{
  "status": "ok",
  "timestamp": "2026-06-30T12:00:00.000Z"
}
```

## OpenAPI Spec

See [02-openapi.yaml](./02-openapi.yaml) for the machine-readable OpenAPI 3.0 definition.
