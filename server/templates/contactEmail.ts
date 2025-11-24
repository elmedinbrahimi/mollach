import type { ContactFormData } from "../../shared/api";

interface EmailTemplateData extends ContactFormData {
  submittedAt: string;
}

/**
 * Generates a beautiful HTML email template for contact form submissions
 * Matches the Molla brand design system with exact colors and typography
 */
export function generateContactEmail(data: EmailTemplateData): string {
  const { name, email, phone, message, submittedAt } = data;

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>Email Template Preview - Molla Contact Form</title>
    <style>
      /* Reset styles */
      /* Force solid text across clients (iOS Mail + Gmail iOS) */
      .text-solid,
      .header-title,
      .header-subtitle,
      .section-title,
      .info-row,
      .info-label,
      .info-value,
      .info-value a,
      .message-text,
      .metadata,
      .footer-tagline,
      .footer-contact,
      .footer-contact-item,
      .footer-contact-item a,
      .footer-copyright {
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        opacity: 1 !important;
      }

      /* Gmail dark mode attribute targeting */
      [data-ogsc] .text-solid,
      [data-ogsc] .header-title,
      [data-ogsc] .header-subtitle,
      [data-ogsc] .section-title,
      [data-ogsc] .info-row,
      [data-ogsc] .info-label,
      [data-ogsc] .info-value,
      [data-ogsc] .info-value a,
      [data-ogsc] .message-text,
      [data-ogsc] .metadata,
      [data-ogsc] .footer-tagline,
      [data-ogsc] .footer-contact,
      [data-ogsc] .footer-contact-item,
      [data-ogsc] .footer-contact-item a,
      [data-ogsc] .footer-copyright {
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
        opacity: 1 !important;
      }

      body {
        font-family: "Familjen Grotesk", -apple-system, BlinkMacSystemFont,
          "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        line-height: 1.6;
        color: #ffffff; /* solid default text color */
        padding: 40px 20px;
        margin: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .email-container {
        margin: 0 auto;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(136, 78, 78, 0.6),
          0 0 0 3px rgba(46, 13, 45, 0.694);
        border: 2px solid rgba(147, 39, 143, 0.592);
        background: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.2) 0%,
            rgba(0, 0, 0, 0.2) 100%
          ),
          radial-gradient(
            60.07% 112.13% at 126.56% -22.41%,
            #93278f 0%,
            #0d0d5d 54%,
            #000037 100%
          ),
          radial-gradient(
            85.35% 142.1% at 55.91% 154.47%,
            #93278f 0%,
            #0d0d5d 54%,
            #000037 100%
          );
        background-clip: padding-box;
      }

      .header {
        padding: 48px 40px 56px;
        text-align: center;
        position: relative;
        border-radius: 24px 24px 0 0;
      }
      .header::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: linear-gradient(
          90deg,
          #0d0d5d 0%,
          #4f144f 33%,
          #0d0d5d 66%,
          #0d0d5d 100%
        );
      }
      .logo-img {
        height: 64px;
        width: auto;
        margin: 0 auto 24px;
        display: block;
      }

      .header-title {
        font-size: 28px;
        font-weight: 600;
        line-height: 1.3;
        letter-spacing: -0.02em;
      }
      /* Make subtitle fully opaque on mobile */
      .header-subtitle {
        font-size: 15px;
        margin-top: 12px;
        font-weight: 400;
      }

      .badge {
        display: inline-block;
        border: 1px solid #472f91;
        border-radius: 999px;
        padding: 10px 24px;
        color: #ffffff !important;
        font-size: 14px;
        margin-bottom: 20px;
        font-weight: 400;
        -webkit-text-fill-color: #ffffff !important;
        opacity: 1 !important;
      }

      .content {
        padding: 48px 40px;
      }
      .section {
        margin-bottom: 32px;
      }
      .section-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
        padding-bottom: 12px;
        letter-spacing: -0.02em;
      }

      .info-card {
        border-left: 5px solid #93278f;
        border: 1px solid #93278f;
        padding: 24px;
        border-radius: 16px;
        margin-bottom: 16px;
      }
      .info-row {
        display: flex;
        align-items: center;
        margin-bottom: 14px;
        font-size: 15px;
      }
      .info-row:last-child {
        margin-bottom: 0;
      }
      .info-icon {
        font-size: 20px;
        margin-right: 14px;
        min-width: 28px;
      }
      .info-label {
        font-weight: 600;
        margin-right: 10px;
        min-width: 70px;
      }
      .info-value {
        word-break: break-word;
        font-weight: 400;
      }
      .info-value a {
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s ease;
      }
      .info-value a:hover {
        color: #e5dbff !important;
      }

      .message-card {
        border: 2px solid #93278f;
        border-radius: 16px;
        padding: 24px;
        margin-top: 12px;
        position: relative;
        overflow: hidden;
      }
      .message-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background-color: #93278f;
        border-radius: 16px 16px 0 0;
      }
      .message-text {
        font-size: 15px;
        line-height: 1.8;
        white-space: pre-wrap;
        word-break: break-word;
        font-weight: 400;
        padding-top: 8px;
        position: relative;
      }

      .metadata {
        padding: 18px 24px;
        border-radius: 12px;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        border: 1px solid #93278f;
      }
      .metadata-item {
        display: flex;
        align-items: center;
      }
      .metadata-icon {
        margin-right: 8px;
      }

      .footer {
        padding: 40px 40px 32px;
        text-align: center;
        position: relative;
      }
      .footer::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        right: 0;
        height: 5px;
        background: linear-gradient(
          90deg,
          #0d0d5d 0%,
          #4f144f 33%,
          #0d0d5d 66%,
          #0d0d5d 100%
        );
      }
      .footer-logo {
        height: 48px;
        width: auto;
        margin: 0 auto 16px;
        display: block;
      }
      .footer-contact {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 24px;
        margin-bottom: 24px;
        font-size: 14px;
      }
      .footer-contact-item {
        display: flex;
        align-items: center;
        font-weight: 400;
      }
      .footer-contact-item a {
        text-decoration: none;
        transition: color 0.2s ease;
      }
      .footer-contact-item a:hover {
        color: #e5dbff !important;
      }
      .footer-divider {
        height: 5px;
        background: linear-gradient(
          90deg,
          #0d0d5d 0%,
          #4f144f 33%,
          #0d0d5d 66%,
          #0d0d5d 100%
        );
        border-radius: 3px;
        margin: 24px auto 20px;
        max-width: 300px;
      }
      .footer-tagline {
        font-size: 15px;
        margin-bottom: 24px;
        font-weight: 400;
        line-height: 1.6;
      }
      .footer-copyright {
        font-size: 13px;
        font-weight: 400;
      }

      @media only screen and (max-width: 600px) {
        body {
          padding: 10px;
        }
        .header {
          padding: 30px 20px;
        }
        .content {
          padding: 30px 20px;
        }
        .footer {
          padding: 25px 20px;
        }
        .header-title {
          font-size: 20px;
        }
        .metadata {
          flex-direction: column;
          align-items: flex-start;
        }
        .footer-contact {
          flex-direction: column;
          gap: 10px;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <!-- Header -->
      <div class="header">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ea272d15b7c9565581b3fa5a8e203be982913a5e?width=172"
          alt="Molla Logo"
          class="logo-img"
        />
        <div class="badge">🇨🇭 New Contact from Website</div>
        <div class="header-title">New Contact Form Submission</div>
        <div class="header-subtitle">
          You've received a new message from your website
        </div>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- Contact Information Section -->
        <div class="section">
          <div class="section-title">📋 Contact Information</div>
          <div class="info-card">
            <div class="info-row">
              <span class="info-icon">👤</span>
              <span class="info-label">Name:</span>
              <span class="info-value">${escapeHtml(name)}</span>
            </div>
            <div class="info-row">
              <span class="info-icon">📧</span>
              <span class="info-label">Email:</span>
              <span class="info-value"
                ><a href="mailto:${escapeHtml(email)}"
                  >${escapeHtml(email)}</a
                ></span
              >
            </div>
            <div class="info-row">
              <span class="info-icon">📞</span>
              <span class="info-label">Phone:</span>
              <span class="info-value"
                ><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></span
              >
            </div>
          </div>
        </div>

        <!-- Message Section -->
        <div class="section">
          <div class="section-title">💬 Message</div>
          <div class="message-card">
            <div class="message-text">
              ${escapeHtml(message)}
            </div>
          </div>
        </div>

        <!-- Metadata Section -->
        <div class="section">
          <div class="metadata">
            <div class="metadata-item">
              <span class="metadata-icon">🕐</span>
              <span>Submitted: ${submittedAt}</span>
            </div>
            <div class="metadata-item">
              <span class="metadata-icon">📍</span>
              <span>Source: Contact Page</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/ea272d15b7c9565581b3fa5a8e203be982913a5e?width=172"
          alt="Molla Logo"
          class="footer-logo"
        />
        <div class="footer-tagline">
          Your Full-Service Digital Agency in Switzerland
        </div>
        <div class="footer-contact">
          <div class="footer-contact-item">
            📧
            <a href="mailto:elmedinbrahimi0@gmail.com"
              >elmedinbrahimi0@gmail.com</a
            >
          </div>
          <div class="footer-contact-item">
            📞 <a href="tel:+41719119000">+41 71 911 90 00</a>
          </div>
          <div class="footer-contact-item">🇨🇭 Switzerland</div>
        </div>
        <div class="footer-divider"></div>
        <div class="footer-copyright">© ${new Date().getFullYear()} Molla. All rights reserved.</div>
      </div>
    </div>
  </body>
</html>
  `.trim();
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
