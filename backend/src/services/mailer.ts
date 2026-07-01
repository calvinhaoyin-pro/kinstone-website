import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { Inquiry } from "../types.js";

const SES_FROM_EMAIL = process.env.SES_FROM_EMAIL ?? "no-reply@kinstone.example";
const SES_TO_EMAIL = process.env.SES_TO_EMAIL ?? "sales@kinstone.example";
const AWS_REGION = process.env.AWS_REGION ?? "us-east-1";

// Defaults to "ses" when actually running in Lambda (AWS sets
// AWS_LAMBDA_FUNCTION_NAME automatically), and to "console" for local dev
// (`npm run dev`/`npm start`) so nobody needs real AWS credentials just to
// run the API locally. Override explicitly with MAILER_DRIVER=ses|console.
const MAILER_DRIVER =
  process.env.MAILER_DRIVER ?? (process.env.AWS_LAMBDA_FUNCTION_NAME ? "ses" : "console");

const sesClient = new SESClient({ region: AWS_REGION });

function buildEmail(inquiry: Inquiry) {
  const subject = `[Kinstone Inquiry] ${inquiry.type} — ${inquiry.name} (${inquiry.company ?? "n/a"})`;
  const body = [
    `Type:         ${inquiry.type}`,
    `Name:         ${inquiry.name}`,
    `Company:      ${inquiry.company ?? "-"}`,
    `Email:        ${inquiry.email}`,
    `Phone:        ${inquiry.phone ?? "-"}`,
    `Product:      ${inquiry.productInterest ?? "-"}`,
    `Locale:       ${inquiry.locale}`,
    "Message:",
    inquiry.message,
  ].join("\n");

  return { subject, body };
}

async function sendViaConsole(inquiry: Inquiry): Promise<void> {
  const { subject, body } = buildEmail(inquiry);
  console.log("\n--- [mailer stub] would send via SES ---");
  console.log(`From:     ${SES_FROM_EMAIL}`);
  console.log(`To:       ${SES_TO_EMAIL}`);
  console.log(`Subject:  ${subject}`);
  console.log("");
  console.log(body);
  console.log("--- end email ---\n");
}

async function sendViaSes(inquiry: Inquiry): Promise<void> {
  const { subject, body } = buildEmail(inquiry);

  await sesClient.send(
    new SendEmailCommand({
      Source: SES_FROM_EMAIL,
      Destination: { ToAddresses: [SES_TO_EMAIL] },
      Message: {
        Subject: { Data: subject },
        Body: { Text: { Data: body } },
      },
    }),
  );
}

export async function sendInquiryEmail(inquiry: Inquiry): Promise<void> {
  if (MAILER_DRIVER === "ses") {
    await sendViaSes(inquiry);
  } else {
    await sendViaConsole(inquiry);
  }
}
