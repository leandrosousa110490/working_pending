# Florida Sign Solution - Landing Page

A modern, responsive landing page for Florida Sign Solution with email functionality for quote requests.

## Features

- 📱 **Mobile-First Design** - Fully responsive across all devices
- 🎨 **Modern UI/UX** - Beautiful gradients, animations, and hover effects
- 📧 **Email Integration** - Quote requests sent directly via email
- ⚡ **TypeScript** - Type-safe, maintainable code
- 🚀 **Bootstrap 5.3** - Latest responsive framework
- 🎯 **SEO Optimized** - Proper meta tags and semantic HTML

## Quick Start

### 🌐 GitHub Pages Deployment (Recommended) ⭐
**✅ YES, this works perfectly on GitHub Pages with REAL email functionality!**

**📧 EmailJS Integration Ready:**
1. **Quick Setup:** See `EMAILJS-SETUP-GUIDE.md` (5 minutes)
2. **Auto Deploy:** Run `deploy-to-github-pages.bat` 
3. **Complete Guide:** See `GITHUB-PAGES-SETUP.md`
4. **Free Hosting:** GitHub Pages + EmailJS (200 emails/month)

**🚀 Files Ready for GitHub Pages:**
- `index-github.html` → Optimized HTML with EmailJS
- `script-github.js` → Client-side email functionality
- `EMAILJS-SETUP-GUIDE.md` → Step-by-step EmailJS setup
- `deploy-to-github-pages.bat` → Automated deployment script

### Option 1: Demo Mode (Current - No Email)
```bash
# Start the Python server (currently running)
python -m http.server 8000
# Visit: http://localhost:8000
```
**Note:** Quote form will work but emails won't be sent. Form data will be logged to browser console.

### Option 2: Full Email Functionality (Local Development)

**⚠️ If you're getting "Failed to send email" errors, follow these steps:**

1. **Configure Gmail App Password:**
   - Go to your Google Account settings
   - Enable 2-Factor Authentication
   - Generate an App Password for "Mail"
   - Replace `your-app-password` in `server.js` with the generated password

2. **Start the Node.js server:**
```bash
# Stop the Python server first (Ctrl+C in terminal)
# Then start Node.js server
npm start
# Visit: http://localhost:3000
```

**The form automatically detects which server you're using and adjusts functionality accordingly.**

## Email Configuration

The quote form is configured to send emails:
- **From:** leandro.sousa1104@gmail.com
- **To:** leandrosousa110490@yahoo.com

### Setting up Gmail App Password:

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Go to "App passwords"
4. Select "Mail" and generate a password
5. Replace `your-app-password` in `server.js` with the generated 16-character password

## File Structure

```
florida/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.ts           # TypeScript source
├── script.js           # Compiled JavaScript
├── server.js           # Node.js email server
├── package.json        # Node.js dependencies
└── README.md           # This file
```

## Development

### Compile TypeScript
```bash
npm run build
```

### Start Development Server
```bash
npm run dev
```

## Sections

- **Hero Section** - Company introduction with statistics
- **Services** - Storefront signs, vehicle wraps, digital signage
- **Portfolio** - Showcase of previous work
- **About** - Company information
- **Contact** - Contact details and quote form
- **Footer** - Additional links and information

## Technologies Used

- **Frontend:** HTML5, CSS3, TypeScript, Bootstrap 5.3
- **Backend:** Node.js, Express.js, Nodemailer
- **Fonts:** Inter, Poppins (Google Fonts)
- **Icons:** Bootstrap Icons
- **Email:** Gmail SMTP with App Password

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT License - Feel free to use this template for your projects.

---

**Note:** For production use, consider using environment variables for email credentials and implementing proper error handling and validation.