# Fix SMTP Connection Error

## 🔴 Current Issue

**Error**: `"configured": true, "connected": false, "message": "Email service configured but connection failed"`

**What this means**: Your SMTP credentials are set up, but Gmail is rejecting the connection.

---

## 🔧 Solution: Generate a Fresh App Password

The current password format (`gdsn_rwdc_fujh_xwic`) might not be correct for Gmail.

### Step 1: Verify 2-Factor Authentication

1. Go to: https://myaccount.google.com/security
2. Check that **2-Step Verification** is **ON**
3. If not, enable it first

### Step 2: Generate a New App Password

1. **Go to App Passwords**: https://myaccount.google.com/apppasswords

2. **If the page says "App passwords are not available":**
   - Make sure 2-Step Verification is enabled
   - Wait a few minutes and try again

3. **Create new App Password:**
   - Select app: **Mail**
   - Select device: **Other (Custom name)**
   - Name it: "Molla Contact Form"
   - Click **Generate**

4. **Copy the password shown** (it looks like: `abcd efgh ijkl mnop`)
   - **Important**: It's 16 characters in 4 groups of 4
   - Write it down somewhere safe

### Step 3: Update Your .env File

**Remove all spaces** from the password before using it.

Example:
- Gmail shows: `abcd efgh ijkl mnop`
- You enter: `abcdefghijklmnop`

Open `.env` file and update:

```env
SMTP_PASSWORD=abcdefghijklmnop
```

(Replace with your actual 16-character password)

### Step 4: Update Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find `SMTP_PASSWORD`
3. Click Edit (pencil icon)
4. Enter the same password (no spaces)
5. Click Save

### Step 5: Restart Dev Server

```bash
# Kill the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

### Step 6: Test Again

Visit: http://localhost:8081/api/email-status

Should now show:
```json
{
  "configured": true,
  "connected": true,
  "message": "Email service is ready"
}
```

---

## 🔍 Alternative: Check Current Password Format

Your current password is: `gdsn_rwdc_fujh_xwic`

**This format is unusual because:**
- Gmail App Passwords don't usually have underscores
- They're typically 16 lowercase letters
- Example: `abcdefghijklmnop`

**If you copied this from Gmail:**
- Make sure you removed ALL spaces
- Don't add any special characters
- Copy exactly as shown

---

## 🧪 Quick Test

Let me help you test if the current credentials work by checking the exact error.

**Check your terminal logs** where `npm run dev` is running. Look for error messages like:
- `Invalid login`
- `Username and Password not accepted`
- `Application-specific password required`

---

## 📝 Common Issues & Solutions

### Issue 1: "Invalid login: Application-specific password required"
**Solution**: Generate an App Password (not your regular Gmail password)

### Issue 2: "Username and Password not accepted"
**Solutions**:
- Verify 2FA is enabled
- Generate a new App Password
- Remove all spaces from the password
- Try the password manually in an email client first

### Issue 3: "Connection timeout"
**Solutions**:
- Check your internet connection
- Disable VPN if using one
- Check firewall settings
- Try different SMTP port (465 with SMTP_SECURE=true)

---

## 🔐 App Password Checklist

- [ ] 2-Factor Authentication is enabled on elmedinbrahimi0@gmail.com
- [ ] App Password generated from https://myaccount.google.com/apppasswords
- [ ] Password is exactly 16 characters
- [ ] Password has NO spaces
- [ ] Password has NO special characters (unless Gmail gave them)
- [ ] Password copied correctly to .env file
- [ ] Dev server restarted after updating .env
- [ ] Same password added to Vercel

---

## 💡 Pro Tip: Test with Gmail SMTP Settings

Try these alternative settings if the standard ones don't work:

```env
# Option 1: Standard (current)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false

# Option 2: SSL (alternative)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
```

---

## ✅ Expected Result

After fixing, you should see:

**Terminal output:**
```
✅ Email service initialized successfully with SMTP
✅ Email service connection verified
```

**API endpoint** (http://localhost:8081/api/email-status):
```json
{
  "configured": true,
  "connected": true,
  "message": "Email service is ready"
}
```

**Test email** should work at:
- http://localhost:8081/api/test-email
- http://localhost:8081/contact (contact form)

---

## 🆘 Still Not Working?

If you've tried everything above and it still fails:

1. **Try a different Gmail account** to rule out account-specific issues
2. **Use a different SMTP service** temporarily (like Mailtrap for testing)
3. **Check Gmail security settings** at https://myaccount.google.com/lesssecureapps
4. **Verify account isn't locked** at https://accounts.google.com

---

## 📧 Alternative: Mailtrap (For Testing Only)

If you want to test the email functionality without using real Gmail:

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_USER=your-mailtrap-username
SMTP_PASSWORD=your-mailtrap-password
EMAIL_TO=elmedinbrahimi0@gmail.com
```

Sign up at: https://mailtrap.io (free for testing)

Mailtrap catches all emails so you can preview them without sending real emails.

---

**Bottom line**: Generate a fresh App Password from Gmail and make sure it's 16 characters with no spaces or underscores!
