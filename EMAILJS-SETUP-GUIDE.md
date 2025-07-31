# 📧 EmailJS Setup Guide for GitHub Pages

## Complete Step-by-Step EmailJS Integration

This guide will help you set up EmailJS for your Florida Sign Solution website on GitHub Pages with **real email functionality**.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's free!)
3. Choose **"Sign up with Google"** or create account manually
4. Verify your email address

### Step 2: Add Email Service

1. **In EmailJS Dashboard:**
   - Click **"Email Services"** in left sidebar
   - Click **"Add New Service"**
   - Choose **"Gmail"**
   - Click **"Connect Account"**
   - Sign in with your Gmail account (`leandro.sousa1104@gmail.com`)
   - **Copy the Service ID** (looks like `service_xxxxxxx`)

### Step 3: Create Email Template

1. **In EmailJS Dashboard:**
   - Click **"Email Templates"** in left sidebar
   - Click **"Create New Template"**
   - **Template Name:** `Florida Sign Quote Request`

2. **Email Template Content:**
   
   **Subject:** `New Quote Request from {{from_name}}`
   
   **To:** `leandrosousa110490@yahoo.com`
   
   **From:** `{{from_email}}` (will be leandro.sousa1104@gmail.com)
   
   **Reply-To:** `{{reply_to}}`
   
   **HTML Body:**
   ```html
   <div style="font-family: system-ui, sans-serif, Arial; font-size: 12px"> 
      <div>A message by {{from_name}} has been received. Kindly respond at your earliest convenience.</div> 
      <div 
        style=" 
          margin-top: 20px; 
          padding: 15px 0; 
          border-width: 1px 0; 
          border-style: dashed; 
          border-color: lightgrey; 
        " 
      > 
        <table role="presentation"> 
          <tr> 
            <td style="vertical-align: top"> 
              <div 
                style=" 
                  padding: 6px 10px; 
                  margin: 0 10px; 
                  background-color: aliceblue; 
                  border-radius: 5px; 
                  font-size: 26px; 
                " 
                role="img" 
              > 
                👤 
              </div> 
            </td> 
            <td style="vertical-align: top"> 
              <div style="color: #2c3e50; font-size: 16px"> 
                <strong>{{from_name}}</strong> 
              </div> 
              <div style="color: #cccccc; font-size: 13px">{{customer_email}} | {{phone}}</div> 
              <div style="color: #7f8c8d; font-size: 14px; margin-top: 5px">Service: {{service_type}}</div>
              <p style="font-size: 16px; margin-top: 10px">{{message}}</p> 
            </td> 
          </tr> 
        </table> 
      </div> 
      <div style="margin-top: 15px; font-size: 11px; color: #95a5a6">
        This email was sent from the Florida Sign Solution website.
      </div>
    </div>
   ```

3. **Save template and copy Template ID** (looks like `template_xxxxxxx`)

### Step 4: Get User ID

1. **In EmailJS Dashboard:**
   - Click **"Account"** in left sidebar
   - Find **"User ID"** (looks like `user_xxxxxxxxxxxxxxx`)
   - **Copy this ID**

### Step 5: Update Your Code

1. **Open `script-github.js`**
2. **Find lines ~212-214:**
   ```javascript
   const serviceID = 'service_xxxxxxx';  // Replace with your Service ID
   const templateID = 'template_xxxxxxx'; // Replace with your Template ID
   const userID = 'user_xxxxxxxxxxxxxxx'; // Replace with your User ID
   ```

3. **Replace with your actual IDs:**
   ```javascript
   const serviceID = 'service_hvexey7';     // Your actual Service ID
   const templateID = 'template_35tifu3';   // Your actual Template ID
   const userID = 'LL0IKULgdWZ8Rfnkj';   // Your actual User ID (Public Key from EmailJS dashboard)
   ```

### Step 6: Test Locally

1. **Open `index-github.html` in browser**
2. **Fill out the quote form**
3. **Submit the form**
4. **Check for success message**
5. **Check your email** (`leandrosousa110490@yahoo.com`)

### Step 7: Deploy to GitHub Pages

1. **Rename files for GitHub Pages:**
   ```bash
   # Backup current files
   mv index.html index-local.html
   mv script.js script-local.js
   
   # Use GitHub versions
   mv index-github.html index.html
   mv script-github.js script.js
   ```

2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add EmailJS integration for GitHub Pages"
   git push
   ```

3. **Your site will be live with email functionality!**

## 🔧 EmailJS Dashboard Configuration

### Email Service Settings
- **Service:** Gmail
- **From Name:** Florida Sign Solution
- **Reply To:** {{reply_to}} (this will be the customer's email)
- **To Email:** leandrosousa110490@yahoo.com

### Template Variables Used
- `{{from_name}}` - Customer's name
- `{{from_email}}` - Customer's email
- `{{phone}}` - Customer's phone
- `{{service_type}}` - Selected service
- `{{message}}` - Customer's message
- `{{reply_to}}` - Customer's email for replies
- `{{to_email}}` - Your email (leandrosousa110490@yahoo.com)

## 📊 EmailJS Free Tier Limits

✅ **What's Included (Free):**
- 200 emails per month
- Unlimited templates
- Unlimited services
- Basic analytics
- Email delivery tracking

📈 **If You Need More:**
- **Personal Plan:** $15/month (1,000 emails)
- **Business Plan:** $35/month (5,000 emails)

## 🧪 Testing Your Setup

### Test Form Submission
1. **Fill out form with test data:**
   - Name: Test Customer
   - Email: your-test-email@gmail.com
   - Phone: (555) 123-4567
   - Service: Custom Signs
   - Message: This is a test submission

2. **Expected Results:**
   - ✅ Success notification appears
   - ✅ Email received at `leandrosousa110490@yahoo.com`
   - ✅ No console errors
   - ✅ Form resets after submission

### Troubleshooting

**❌ "EmailJS not loaded" error:**
- Check internet connection
- Verify EmailJS script is included in HTML
- Check browser console for script loading errors

**❌ "Invalid service ID" error:**
- Double-check Service ID in EmailJS dashboard
- Ensure no extra spaces in the ID
- Verify service is active

**❌ "Template not found" error:**
- Verify Template ID in EmailJS dashboard
- Check template is published/active
- Ensure template variables match

**❌ Emails not received:**
- Check spam/junk folder
- Verify email address in template
- Check EmailJS dashboard for delivery status
- Ensure Gmail service is properly connected

## 🎯 Final Checklist

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created with correct variables
- [ ] Service ID, Template ID, and User ID copied
- [ ] IDs updated in `script-github.js`
- [ ] EmailJS script included in HTML
- [ ] Form tested locally
- [ ] Files renamed for GitHub Pages
- [ ] Code committed and pushed
- [ ] Live site tested
- [ ] Email delivery confirmed

## 🆘 Need Help?

If you encounter any issues:

1. **Check EmailJS Dashboard** for error logs
2. **Open browser console** to see JavaScript errors
3. **Verify all IDs** are correctly copied
4. **Test with a simple message** first
5. **Check email spam folders**

---

**🎉 Once configured, your Florida Sign Solution website will have professional email functionality on GitHub Pages for FREE!**

**📧 Customers can submit quote requests → You receive emails instantly → Reply directly to customers**