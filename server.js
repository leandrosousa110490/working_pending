const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'leandro.sousa1104@gmail.com',
        pass: 'your-app-password' // Use App Password for Gmail
    }
});

// API endpoint to send emails
app.post('/api/send-email', async (req, res) => {
    try {
        const { from, to, subject, html } = req.body;
        
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html
        };
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        
        res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully',
            messageId: info.messageId 
        });
        
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send email',
            error: error.message 
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Email service ready for Florida Sign Solution');
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('Server shutting down...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('Server shutting down...');
    process.exit(0);
});