import type { Inquiry } from "../types.js";

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE;

// In-memory stand-in for the optional DynamoDB inquiry log described in
// docs/design/01-backend-architecture.md. [TODO] Replace with a real
// DynamoDB `PutItem` call once deployed — this state does not persist
// across restarts and is for local development only.
const inMemoryInquiries: Inquiry[] = [];

export async function logInquiry(inquiry: Inquiry): Promise<void> {
  inMemoryInquiries.push(inquiry);
  console.log(
    `[store stub] logged inquiry ${inquiry.id} (table: ${DYNAMODB_TABLE ?? "not configured"}); ` +
      `${inMemoryInquiries.length} inquiry(ies) in this dev session`,
  );
}

export function getLoggedInquiries(): readonly Inquiry[] {
  return inMemoryInquiries;
}
