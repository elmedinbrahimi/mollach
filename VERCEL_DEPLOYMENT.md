# Vercel Deployment Guide - Email Configuration

This guide explains how to configure the Molla contact form email service on Vercel.

## 🎯 Overview

Your project is deployed on Vercel and needs SMTP credentials to send emails from the contact form.

## 📋 Prerequisites

1. Vercel account with your project deployed
2. Gmail account with App Password (or other SMTP service)
3. Access to Vercel project settings

---

## 🔧 Step-by-Step Configuration

### Step 1: Generate Gmail App Password

1. **Enable 2-Factor Authentication** on your Gmail:
   - Go to: https://myaccount.google.com/security
   - Click "2-Step Verification" and follow the setup

2. **Generate an App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select **Mail** as the app
   - Select **Other (Custom name)** as the device
   - Enter: "Molla Contact Form - Vercel"
   - Click **Generate**
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)
   - **Important**: Remove all spaces when using it

### Step 2: Add Environment Variables in Vercel

1. **Go to your Vercel Dashboard**:
   - Visit: https://vercel.com/dashboard
   - Select your Molla project

2. **Navigate to Settings**:
   - Click on **Settings** tab
   - Click on **Environment Variables** in the sidebar

3. **Add the following environment variables**:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `SMTP_HOST` | `smtp.gmail.com` | Production, Preview, Development |
   | `SMTP_PORT` | `587` | Production, Preview, Development |
   | `SMTP_SECURE` | `false` | Production, Preview, Development |
   | `SMTP_USER` | `your-gmail@gmail.com` | Production, Preview, Development |
   | `SMTP_PASSWORD` | `your-app-password` | Production, Preview, Development |
   | `EMAIL_FROM` | `"Molla <noreply@molla.ch>"` | Production, Preview, Development |
   | `EMAIL_TO` | `elmedinbrahimi0@gmail.com` | Production, Preview, Development |
   | `NODE_ENV` | `production` | Production only |

4. **Important Notes**:
   - Replace `your-gmail@gmail.com` with your actual Gmail address
   - Replace `your-app-password` with the 16-character App Password (no spaces)
   - Check all three environments: **Production**, **Preview**, and **Development**
   - Click **Save** after adding each variable

### Step 3: Add Environment Variables via Vercel CLI (Alternative)

If you prefer using the CLI:

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add SMTP_HOST
# Enter: smtp.gmail.com
# Select: Production, Preview, Development

vercel env add SMTP_PORT
# Enter: 587
# Select: Production, Preview, Development

vercel env add SMTP_SECURE
# Enter: false
# Select: Production, Preview, Development

vercel env add SMTP_USER
# Enter: your-gmail@gmail.com
# Select: Production, Preview, Development

vercel env add SMTP_PASSWORD
# Enter: your-app-password-here
# Select: Production, Preview, Development

vercel env add EMAIL_FROM
# Enter: "Molla <noreply@molla.ch>"
# Select: Production, Preview, Development

vercel env add EMAIL_TO
# Enter: elmedinbrahimi0@gmail.com
# Select: Production, Preview, Development

vercel env add NODE_ENV
# Enter: production
# Select: Production only
```

### Step 4: Redeploy Your Application

After adding environment variables, you need to redeploy:

#### Option A: Via Vercel Dashboard
1. Go to your project's **Deployments** tab
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**
4. Check "Use existing Build Cache"
5. Click **Redeploy**

#### Option B: Via Git Push
```bash
# Make a small change or use --force
git commit --allow-empty -m "Trigger Vercel redeploy for env vars"
git push origin main
```

#### Option C: Via Vercel CLI
```bash
vercel --prod
```

---

## ✅ Verify Configuration

### Method 1: Check Email Status Endpoint

Visit your production URL:
```
https://your-project.vercel.app/api/email-status
```

**Expected Response (Success):**
```json
{
  "configured": true,
  "connected": true,
  "message": "Email service is ready"
}
```

**Expected Response (If Not Configured):**
```json
{
  "configured": false,
  "connected": false,
  "message": "Email service not configured"
}
```

### Method 2: Send Test Email

Visit:
```
https://your-project.vercel.app/api/test-email
```

**Expected Response (Success):**
```json
{
  "success": true,
  "message": "Test email sent successfully! Check your inbox."
}
```

**Note**: This endpoint only works in development. For production, test via the contact form.

### Method 3: Test Contact Form

1. Visit: `https://your-project.vercel.app/contact`
2. Fill out the form with test data
3. Click "Send"
4. Check for success message
5. Check your email inbox at **elmedinbrahimi0@gmail.com**

---

## 🐛 Troubleshooting

### Issue 1: "Email service not configured"

**Cause**: Environment variables not set or deployment hasn't picked them up.

**Solutions**:
1. Verify all environment variables are added in Vercel dashboard
2. Redeploy your application
3. Check you selected the correct environment (Production/Preview/Development)
4. Wait 1-2 minutes after redeployment for env vars to take effect

### Issue 2: "Invalid login" or "Authentication failed"

**Solutions**:
1. Verify you're using an **App Password**, not your regular Gmail password
2. Ensure the App Password has **no spaces**
3. Generate a new App Password if needed
4. Update `SMTP_PASSWORD` in Vercel
5. Redeploy

### Issue 3: "Connection timeout" or "Network error"

**Solutions**:
1. Verify SMTP_HOST is `smtp.gmail.com`
2. Verify SMTP_PORT is `587`
3. Verify SMTP_SECURE is `false`
4. Check Gmail account is not locked or suspended
5. Ensure 2-Factor Authentication is still enabled

### Issue 4: Emails go to spam folder

**Solutions**:
1. Ask recipients to mark emails as "Not Spam"
2. Consider using SendGrid or Mailgun for better deliverability
3. Set up SPF/DKIM records for your domain

### Issue 5: "Rate limit exceeded"

**Solution**: The rate limiter is stored in memory and resets when the serverless function cold-starts. This is normal behavior. For production, consider using:
- Upstash Redis for persistent rate limiting
- Vercel KV for edge rate limiting

### Issue 6: Function timeout on Vercel

**Solution**: Gmail SMTP should respond quickly. If you see timeouts:
1. Check your Gmail account isn't locked
2. Consider using SendGrid or Mailgun (faster SMTP)
3. Increase function timeout in vercel.json (if using Pro plan)

---

## 🔒 Security Best Practices

### 1. Environment Variables Security
- ✅ Never commit `.env` file to Git (already in `.gitignore`)
- ✅ Use different SMTP credentials for development and production
- ✅ Rotate App Passwords periodically
- ✅ Use Vercel's encrypted environment variables

### 2. Email Security
- ✅ Rate limiting is built-in (5 requests/hour per IP)
- ✅ Input validation with Zod schemas
- ✅ XSS protection via HTML escaping
- ✅ CORS configured to prevent unauthorized access

### 3. Monitoring
- Check Vercel function logs regularly
- Monitor email delivery rates
- Set up alerts for failed emails
- Track rate limit hits

---

## 🚀 Alternative SMTP Providers for Production

While Gmail works well for development, consider these alternatives for production:

### Option 1: SendGrid (Recommended)

**Pros**:
- 100 emails/day free tier
- Better deliverability
- Email analytics
- Fast and reliable

**Setup**:
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASSWORD=<your-sendgrid-api-key>
```

**Sign up**: https://sendgrid.com/

### Option 2: Mailgun

**Pros**:
- 5,000 emails/month free trial
- Excellent deliverability
- Advanced analytics
- Great for transactional emails

**Setup**:
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<your-mailgun-smtp-user>
SMTP_PASSWORD=<your-mailgun-smtp-password>
```

**Sign up**: https://www.mailgun.com/

### Option 3: AWS SES (Advanced)

**Pros**:
- Very cheap ($0.10 per 1,000 emails)
- Highly scalable
- AWS integration

**Setup**:
```env
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<your-aws-access-key>
SMTP_PASSWORD=<your-aws-secret-key>
```

**Sign up**: https://aws.amazon.com/ses/

### Option 4: Resend (Modern Choice)

**Pros**:
- Developer-friendly API
- 3,000 emails/month free
- Built for modern frameworks
- Excellent documentation

**Setup**:
```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=resend
SMTP_PASSWORD=<your-resend-api-key>
```

**Sign up**: https://resend.com/

---

## 📊 Vercel Function Considerations

### Function Execution Time
- Gmail SMTP typically responds in 1-3 seconds
- Vercel Hobby plan: 10 second timeout
- Vercel Pro plan: 60 second timeout
- Should be sufficient for email sending

### Cold Starts
- Serverless functions may have cold starts
- First request after inactivity: 2-5 seconds
- Subsequent requests: < 1 second
- Rate limiting resets on cold starts

### Memory Usage
- Email service uses minimal memory
- Nodemailer is lightweight
- No issues with Vercel's 1GB default memory limit

---

## 📝 Vercel Configuration Files

Your project already has the necessary configuration:

### vercel.json (if needed)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "regions": ["iad1"],
  "functions": {
    "api/**/*.js": {
      "maxDuration": 10
    }
  }
}
```

### package.json scripts
Already configured with:
```json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "vite build --config vite.config.server.ts"
  }
}
```

---

## ✅ Quick Checklist

Before going live with email functionality:

- [ ] Gmail 2-Factor Authentication enabled
- [ ] App Password generated and saved
- [ ] All environment variables added in Vercel
- [ ] Environment variables set for all three environments (Production, Preview, Development)
- [ ] Application redeployed after adding env vars
- [ ] Email status endpoint tested: `/api/email-status`
- [ ] Contact form tested on production URL
- [ ] Email received successfully at elmedinbrahimi0@gmail.com
- [ ] Success/error toasts working correctly
- [ ] Form clears after successful submission
- [ ] Rate limiting tested (5 submissions max)
- [ ] Email template looks correct in inbox
- [ ] Reply-to address works correctly

---

## 🎯 Production Deployment Workflow

### Initial Setup (One-time)
1. Add environment variables in Vercel
2. Redeploy application
3. Test email functionality

### Updates/Changes
1. Update environment variables in Vercel (if needed)
2. Push code changes to Git
3. Vercel auto-deploys
4. Test contact form

### Monitoring
1. Check Vercel function logs: Dashboard > Project > Functions
2. Monitor email deliverability
3. Track rate limit hits in logs
4. Review error rates

---

## 📚 Additional Resources

- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [SendGrid Setup Guide](https://docs.sendgrid.com/for-developers/sending-email/getting-started-smtp)

---

## 💡 Pro Tips

1. **Test in Preview Deployments First**
   - Vercel creates preview deployments for each branch
   - Test email functionality there before production

2. **Use Different Email Accounts**
   - Development: Personal Gmail
   - Production: Business email or transactional service

3. **Monitor Gmail Sending Limits**
   - Free Gmail: 500 emails/day
   - G Suite: 2,000 emails/day
   - Consider SendGrid/Mailgun for higher volume

4. **Set Up Email Notifications**
   - Use Vercel's integration with Slack/Discord
   - Get notified of deployment failures
   - Monitor function errors

5. **Use Vercel Analytics**
   - Track contact form submission rates
   - Monitor function execution times
   - Identify performance bottlenecks

---

## 🆘 Need Help?

If you encounter issues:

1. **Check Vercel Function Logs**:
   - Dashboard > Your Project > Functions > View Logs
   - Look for email-related errors

2. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for API errors or network issues

3. **Test API Endpoints Directly**:
   - Use Postman or curl to test `/api/contact`
   - Verify request/response format

4. **Common Error Messages**:
   - "Email service not configured" → Add env vars
   - "Invalid login" → Check App Password
   - "Network error" → Check SMTP settings
   - "Rate limit exceeded" → Wait 1 hour

---

## 📧 Your Email Configuration

```
┌─────────────────────────────────────────┐
│  SMTP Configuration                     │
├─────────────────────────────────────────┤
│  Host:     smtp.gmail.com               │
│  Port:     587                          │
│  Secure:   false (STARTTLS)            │
│  User:     [Your Gmail]                 │
│  Password: [App Password - 16 chars]    │
├─────────────────────────────────────────┤
│  Email Routing                          │
├─────────────────────────────────────────┤
│  From:     Molla <noreply@molla.ch>    │
│  To:       elmedinbrahimi0@gmail.com   │
│  Reply-To: [Form submitter's email]    │
└─────────────────────────────────────────┘
```

---

**Your contact form is ready for production! 🚀**

Once you add the environment variables and redeploy, emails will be sent to **elmedinbrahimi0@gmail.com** whenever someone submits the contact form on your Vercel deployment.
