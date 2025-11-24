# Email Service Setup Guide

This guide will help you configure the Nodemailer integration for the Molla contact form.

## 🎉 Quick Start - Development Mode

**Good news!** The email service works out of the box in **console-only mode** for development.

When SMTP is not configured:
- ✅ The contact form works perfectly
- ✅ Emails are logged to the terminal console
- ✅ You can see all email content formatted nicely
- ✅ No email account setup required for testing

**To see emails in the console:**
1. Submit the contact form at http://localhost:8081/contact
2. Check your terminal where `npm run dev` is running
3. You'll see a nicely formatted email output

**To enable real email sending**, follow the configuration steps below.

---

## 📋 Prerequisites (For Real Email Sending)

- A Gmail account (or any other SMTP email service)
- Node.js and npm installed
- Access to the `.env` file

## 🔧 Configuration Steps

### Option 1: Using Gmail (Recommended for Development)

#### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** > **2-Step Verification**
3. Follow the prompts to enable 2-factor authentication

#### Step 2: Generate an App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter "Molla Contact Form" as the custom name
5. Click **Generate**
6. Copy the 16-character password (remove spaces)

#### Step 3: Update .env File

Open the `.env` file in the project root and update these values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASSWORD=your-16-char-app-password-here

EMAIL_FROM="Molla <noreply@molla.ch>"
EMAIL_TO=elmedinbrahimi0@gmail.com
```

**Important:**
- Replace `your-gmail-address@gmail.com` with your actual Gmail address
- Replace `your-16-char-app-password-here` with the App Password you generated (without spaces)
- The `EMAIL_TO` is already set to your test email: elmedinbrahimi0@gmail.com

### Option 2: Using SendGrid

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key

EMAIL_FROM="Molla <noreply@molla.ch>"
EMAIL_TO=elmedinbrahimi0@gmail.com
```

### Option 3: Using Mailgun

```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailgun-smtp-username
SMTP_PASSWORD=your-mailgun-smtp-password

EMAIL_FROM="Molla <noreply@molla.ch>"
EMAIL_TO=elmedinbrahimi0@gmail.com
```

### Option 4: Using AWS SES

```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-aws-ses-smtp-username
SMTP_PASSWORD=your-aws-ses-smtp-password

EMAIL_FROM="Molla <noreply@molla.ch>"
EMAIL_TO=elmedinbrahimi0@gmail.com
```

## 🧪 Testing the Email Service

### Method 1: Check Email Service Status

Visit: http://localhost:8081/api/email-status

This will return:
```json
{
  "configured": true,
  "connected": true,
  "message": "Email service is ready"
}
```

### Method 2: Send a Test Email

Visit: http://localhost:8081/api/test-email

This will send a test email with sample data to verify your configuration is working.

### Method 3: Test via Contact Form

1. Go to: http://localhost:8081/contact
2. Fill out the contact form:
   - Name: Test User
   - Phone: +41 79 123 45 67
   - Email: test@example.com
   - Message: This is a test message
3. Click "Send"
4. You should see a success toast notification
5. Check your inbox at elmedinbrahimi0@gmail.com

## 📧 Email Template Features

The contact form sends beautifully designed HTML emails with:

- **Dark gradient header** matching your brand (purple/navy colors)
- **Molla logo** in the header
- **Contact information card** with name, email, and phone
- **Message display** in a clean, readable format
- **Metadata section** with submission timestamp and source
- **Professional footer** with company information
- **Mobile-responsive design** that looks great on all devices

## 🔒 Security Features

- **Rate limiting**: Maximum 5 submissions per hour per IP address
- **Input validation**: All fields are validated using Zod schemas
- **XSS protection**: All user input is sanitized before sending
- **CORS**: Configured to prevent unauthorized access

## 📝 API Endpoints

### POST /api/contact
Submit a contact form message

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+41 79 123 45 67",
  "message": "Hello, I'd like to discuss..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We'll get back to you soon!"
}
```

**Error Response (400/429/500):**
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

### GET /api/email-status
Check if email service is configured and connected

### GET /api/test-email (Development Only)
Send a test email with sample data

## 🐛 Troubleshooting

### Issue: "Email service not configured"

**Solution:** Make sure your `.env` file has valid `SMTP_USER` and `SMTP_PASSWORD` values.

### Issue: "Invalid login" or "Authentication failed"

**Solutions:**
1. Make sure you're using an App Password, not your regular Gmail password
2. Verify the App Password is correct (copy-paste to avoid typos)
3. Ensure 2-Factor Authentication is enabled on your Gmail account

### Issue: "Connection timeout"

**Solutions:**
1. Check your internet connection
2. Verify the SMTP_HOST and SMTP_PORT are correct
3. Try disabling any VPN or firewall that might block SMTP

### Issue: Emails going to spam

**Solutions:**
1. Ask email recipients to mark your emails as "Not Spam"
2. Consider using a custom domain with proper SPF/DKIM records
3. Use a transactional email service like SendGrid or Mailgun for production

### Issue: Rate limit exceeded

**Solution:** The form is limited to 5 submissions per hour per IP. Wait an hour or clear the server cache and restart.

## 🚀 Production Deployment

For production, consider:

1. **Use a transactional email service** (SendGrid, Mailgun, AWS SES)
2. **Set up SPF and DKIM records** for your domain
3. **Use a custom domain** instead of Gmail
4. **Enable email logging** and monitoring
5. **Set up email delivery tracking**
6. **Configure proper error handling** and admin notifications
7. **Use Redis or database** for rate limiting instead of in-memory store

## 📚 Additional Resources

- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [SendGrid SMTP Guide](https://docs.sendgrid.com/for-developers/sending-email/getting-started-smtp)
- [Mailgun SMTP Guide](https://documentation.mailgun.com/en/latest/user_manual.html#sending-via-smtp)

## ✅ Quick Checklist

- [ ] Gmail 2-Factor Authentication enabled
- [ ] App Password generated
- [ ] `.env` file updated with correct credentials
- [ ] Development server restarted
- [ ] Email service status checked (http://localhost:8081/api/email-status)
- [ ] Test email sent successfully
- [ ] Contact form tested
- [ ] Email received in inbox

## 💡 Tips

- **Keep your `.env` file secure** - it's already in `.gitignore`
- **Use different email accounts** for development and production
- **Monitor your email sending limits** (Gmail: 500 emails/day)
- **Test with multiple email providers** to ensure compatibility
- **Keep the email template simple** for better client compatibility

---

**Need help?** Check the logs in the terminal where `npm run dev` is running. Email-related messages are prefixed with ✅ (success) or ❌ (error).
