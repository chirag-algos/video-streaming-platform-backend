import dotenv from "dotenv";
dotenv.config(); // 🔥 ADD THIS LINE FIRST

import nodemailer from "nodemailer";
// Validate email configuration
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("❌ ERROR: EMAIL_USER or EMAIL_PASS environment variables are not set");
    console.error("   Gmail Setup Instructions:");
    console.error("   1. Go to myaccount.google.com/apppasswords");
    console.error("   2. Select 'Mail' and 'Windows Computer'");
    console.error("   3. Copy the 16-character password to EMAIL_PASS");
    console.error("\n   Add to your .env file:");
    console.error("   EMAIL_USER=your-email@gmail.com");
    console.error("   EMAIL_PASS=xxxx xxxx xxxx xxxx");
    if (process.env.NODE_ENV === 'production') {
        throw new Error("Missing email configuration - cannot start in production");
    }
    // Exit early in development to prevent crash
    process.exit(1);
}

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS.replace(/\s/g, '') // Remove spaces from App Password
    }
});

// Test connection on startup (only in production)
if (process.env.NODE_ENV === 'production') {
    transporter.verify((error, success) => {
        if (error) {
            console.warn("⚠️  Nodemailer verification failed (may be network restricted on Railway):", error.message);
            console.warn("⚠️  Email will still work when needed - continuing without verification");
        } else {
            console.log("✅ Nodemailer verified and ready to send emails");
        }
    });
}