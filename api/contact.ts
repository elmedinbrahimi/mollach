import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Rate limiting store (in-memory, will reset on cold starts)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitStore.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + 60 * 60 * 1000, // 1 hour
    });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Get client IP
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown';
    const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return res.status(429).json({
        success: false,
        message: 'Rate limit exceeded',
        error: 'Too many requests. Please try again later.',
      });
    }

    // Validate request body
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Name, email, and message are required',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Invalid email address',
      });
    }

    // Check SMTP configuration
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP credentials not configured');

      // Log to console in development
      console.log('\n' + '='.repeat(80));
      console.log('📧 EMAIL (CONSOLE-ONLY MODE)');
      console.log('='.repeat(80));
      console.log('From:', name);
      console.log('Email:', email);
      console.log('Phone:', phone || 'Not provided');
      console.log('Message:', message);
      console.log('='.repeat(80) + '\n');

      return res.status(500).json({
        success: false,
        message: 'Email service not configured',
        error: 'SMTP credentials missing',
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    const submittedAt = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Zurich',
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@molla.ch',
      to: process.env.EMAIL_TO || 'elmedinbrahimi0@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #472F91 0%, #8F278F 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">New Contact Form Submission</h1>
            </div>

            <div style="padding: 40px 30px;">
              <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 20px; font-weight: 600;">Contact Information</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                      <strong style="color: #666;">Name:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right; color: #1a1a1a;">
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                      <strong style="color: #666;">Email:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right;">
                      <a href="mailto:${email}" style="color: #472F91; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
                      <strong style="color: #666;">Phone:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; text-align: right; color: #1a1a1a;">
                      ${phone || 'Not provided'}
                    </td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #1a1a1a; font-size: 20px; font-weight: 600;">Message</h2>
                <div style="background-color: #f9f9f9; border-left: 4px solid #472F91; padding: 20px; border-radius: 4px;">
                  <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <div style="padding-top: 20px; border-top: 1px solid #e5e5e5; color: #999; font-size: 14px;">
                <p style="margin: 0;">Submitted: ${submittedAt}</p>
              </div>
            </div>

            <div style="background-color: #f9f9f9; padding: 20px 30px; text-align: center; color: #666; font-size: 14px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} Molla. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
NEW CONTACT FORM SUBMISSION
===========================

Name:    ${name}
Email:   ${email}
Phone:   ${phone || 'Not provided'}

MESSAGE:
${message}

Submitted: ${submittedAt}
      `.trim(),
    });

    console.log('✅ Email sent successfully');

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!",
    });
  } catch (error) {
    console.error('❌ Error handling contact form:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
