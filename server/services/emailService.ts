import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import type { ContactFormData } from "../../shared/api";
import { generateContactEmail } from "../templates/contactEmail";

/**
 * Email service configuration
 */
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

/**
 * Email service class for sending emails via Nodemailer
 */
class EmailService {
  private transporter: Transporter | null = null;
  private fromEmail: string;
  private toEmail: string;

  constructor() {
    this.fromEmail = process.env.EMAIL_FROM || "noreply@molla.ch";
    this.toEmail = process.env.EMAIL_TO || "elmedinbrahimi0@gmail.com";
    this.initialize();
  }

  /**
   * Initialize the Nodemailer transporter
   */
  private initialize(): void {
    try {
      const config: EmailConfig = {
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER || "",
          pass: process.env.SMTP_PASSWORD || "",
        },
      };

      // Check if running in console-only mode (for development)
      const isConfigured = config.auth.user &&
                          config.auth.pass &&
                          config.auth.user !== "your-email@gmail.com" &&
                          config.auth.pass !== "your-app-password-here";

      if (!isConfigured) {
        console.warn(
          "⚠️  Email service running in CONSOLE-ONLY mode (SMTP not configured)"
        );
        console.warn(
          "📧 Emails will be logged to console instead of being sent"
        );
        console.warn(
          "💡 To enable real emails, configure SMTP_USER and SMTP_PASSWORD in .env"
        );
        // Don't initialize transporter - will use console logging
        return;
      }

      this.transporter = nodemailer.createTransport(config);

      console.log("✅ Email service initialized successfully with SMTP");
    } catch (error) {
      console.error("❌ Failed to initialize email service:", error);
    }
  }

  /**
   * Verify the email service connection
   */
  async verifyConnection(): Promise<boolean> {
    if (!this.transporter) {
      console.error("❌ Email transporter not initialized");
      return false;
    }

    try {
      await this.transporter.verify();
      console.log("✅ Email service connection verified");
      return true;
    } catch (error) {
      console.error("❌ Email service connection failed:", error);
      return false;
    }
  }

  /**
   * Send contact form email
   */
  async sendContactFormEmail(
    formData: ContactFormData
  ): Promise<{ success: boolean; error?: string }> {
    // Format submission timestamp
    const submittedAt = new Date().toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Zurich",
    });

    // If no transporter (console-only mode), log to console
    if (!this.transporter) {
      console.log("\n" + "=".repeat(80));
      console.log("📧 EMAIL (CONSOLE-ONLY MODE - Not actually sent)");
      console.log("=".repeat(80));
      console.log("From:", this.fromEmail);
      console.log("To:", this.toEmail);
      console.log("Subject:", `New Contact Form Submission from ${formData.name}`);
      console.log("Reply-To:", formData.email);
      console.log("-".repeat(80));
      console.log("CONTACT INFORMATION:");
      console.log("  Name:", formData.name);
      console.log("  Email:", formData.email);
      console.log("  Phone:", formData.phone);
      console.log("-".repeat(80));
      console.log("MESSAGE:");
      console.log(formData.message);
      console.log("-".repeat(80));
      console.log("Submitted:", submittedAt);
      console.log("=".repeat(80) + "\n");

      return {
        success: true,
      };
    }

    try {
      // Generate email HTML
      const emailHtml = generateContactEmail({
        ...formData,
        submittedAt,
      });

      // Send email via SMTP
      const info = await this.transporter.sendMail({
        from: this.fromEmail,
        to: this.toEmail,
        subject: `New Contact Form Submission from ${formData.name}`,
        html: emailHtml,
        text: this.generatePlainTextEmail(formData, submittedAt),
        replyTo: formData.email,
      });

      console.log("✅ Email sent successfully via SMTP:", info.messageId);

      return {
        success: true,
      };
    } catch (error) {
      console.error("❌ Failed to send email:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      };
    }
  }

  /**
   * Generate plain text version of the email (fallback)
   */
  private generatePlainTextEmail(
    formData: ContactFormData,
    submittedAt: string
  ): string {
    return `
NEW CONTACT FORM SUBMISSION
===========================

CONTACT INFORMATION
-------------------
Name:    ${formData.name}
Email:   ${formData.email}
Phone:   ${formData.phone}

MESSAGE
-------
${formData.message}

METADATA
--------
Submitted: ${submittedAt}
Source: Contact Page

---
Molla - Digital Solutions for the Future
Email: info@molla.ch
Phone: +41 71 911 90 00
Location: Switzerland

© ${new Date().getFullYear()} Molla. All rights reserved.
    `.trim();
  }

  /**
   * Send a test email (for development/testing)
   */
  async sendTestEmail(): Promise<{ success: boolean; error?: string }> {
    const testData: ContactFormData = {
      name: "John Doe (Test)",
      email: "john.doe@example.com",
      phone: "+41 79 123 45 67",
      message:
        "This is a test message from the Molla contact form. Testing the email integration with a beautiful custom template that matches the website design system.",
    };

    console.log("🧪 Sending test email...");
    return this.sendContactFormEmail(testData);
  }
}

// Export singleton instance
export const emailService = new EmailService();
