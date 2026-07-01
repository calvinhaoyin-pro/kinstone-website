import { randomUUID } from "node:crypto";
import { Router, type Request, type Response, type NextFunction } from "express";
import { InquirySchema } from "../schemas/inquiry.js";
import { sendInquiryEmail } from "../services/mailer.js";
import { logInquiry } from "../services/store.js";
import { rateLimiter } from "../middleware/rateLimiter.js";
import type { Inquiry } from "../types.js";

export const inquiriesRouter = Router();

inquiriesRouter.post(
  "/inquiries",
  rateLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = InquirySchema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({
          error: "Validation failed",
          details: result.error.issues.map((issue) => ({
            field: issue.path.join(".") || "(root)",
            message: issue.message,
          })),
        });
        return;
      }

      const { "company-website": honeypot, ...data } = result.data;

      const inquiry: Inquiry = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        ...data,
      };

      if (honeypot) {
        // Likely a bot — pretend success without emailing or logging anything.
        res.status(201).json({ id: inquiry.id, message: "Inquiry submitted successfully" });
        return;
      }

      await Promise.all([sendInquiryEmail(inquiry), logInquiry(inquiry)]);

      res.status(201).json({ id: inquiry.id, message: "Inquiry submitted successfully" });
    } catch (error) {
      next(error);
    }
  },
);
