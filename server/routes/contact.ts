import type { Request, Response } from "express";
import { contactFormSchema, type ContactFormResponse } from "../../shared/api";
import { emailService } from "../services/emailService";

/**
 * Rate limiting store
 * In production, use Redis or a proper rate limiting service
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Simple rate limiter (5 requests per hour per IP)
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new entry
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + 60 * 60 * 1000, // 1 hour from now
    });
    return true;
  }

  if (limit.count >= 5) {
    return false; // Rate limit exceeded
  }

  // Increment count
  limit.count++;
  rateLimitStore.set(ip, limit);
  return true;
}

/**
 * Clean up old entries from rate limit store (run periodically)
 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 10 * 60 * 1000); // Clean up every 10 minutes

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function handleContactForm(
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Get client IP
    const clientIp =
      req.ip ||
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";
    const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;

    // Check rate limit
    if (!checkRateLimit(ip)) {
      const response: ContactFormResponse = {
        success: false,
        message: "Rate limit exceeded",
        error: "Too many requests. Please try again later.",
      };
      res.status(429).json(response);
      return;
    }

    // Validate request body using Zod schema
    const validationResult = contactFormSchema.safeParse(req.body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");

      const response: ContactFormResponse = {
        success: false,
        message: "Validation failed",
        error: errors,
      };
      res.status(400).json(response);
      return;
    }

    // Send email
    const emailResult = await emailService.sendContactFormEmail(
      validationResult.data
    );

    if (!emailResult.success) {
      const response: ContactFormResponse = {
        success: false,
        message: "Failed to send email",
        error:
          emailResult.error ||
          "An error occurred while processing your request",
      };
      res.status(500).json(response);
      return;
    }

    // Success response
    const response: ContactFormResponse = {
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    };
    res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error handling contact form:", error);

    const response: ContactFormResponse = {
      success: false,
      message: "Internal server error",
      error: "An unexpected error occurred. Please try again later.",
    };
    res.status(500).json(response);
  }
}

/**
 * GET /api/test-email (development only)
 * Send a test email to verify configuration
 */
export async function handleTestEmail(
  req: Request,
  res: Response
): Promise<void> {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    res.status(403).json({ error: "Not available in production" });
    return;
  }

  try {
    console.log("📧 Sending test email...");
    const result = await emailService.sendTestEmail();

    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Test email sent successfully! Check your inbox.",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to send test email",
        error: result.error,
      });
    }
  } catch (error) {
    console.error("❌ Error sending test email:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * GET /api/email-status
 * Check if email service is configured and working
 */
export async function handleEmailStatus(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const isConfigured =
      !!process.env.SMTP_USER && !!process.env.SMTP_PASSWORD;
    const isConnected = isConfigured
      ? await emailService.verifyConnection()
      : false;

    res.status(200).json({
      configured: isConfigured,
      connected: isConnected,
      message: isConnected
        ? "Email service is ready"
        : isConfigured
          ? "Email service configured but connection failed"
          : "Email service not configured",
    });
  } catch (error) {
    res.status(500).json({
      configured: false,
      connected: false,
      message: "Error checking email status",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
