import dotenv from "dotenv";
dotenv.config();

import { transporter } from "./utils/nodeMailer.js";

const testEmail = async () => {
    try {
        console.log("📧 Testing email configuration...");
        console.log(`   From: ${process.env.EMAIL_USER}`);
        console.log(`   To: ${process.env.EMAIL_CHECK}`);
        
        const result = await transporter.sendMail({
            from: `"Valdora Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_CHECK, // Send to email check address
            subject: "✅ Email Configuration Test - Valdora",
            html: `
                <div style="font-family: sans-serif; text-align: center; background: #0f0f0f; color: white; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #e11d48;">✅ Email system is working!</h2>
                    <p>Your nodemailer configuration is set up correctly.</p>
                    <div style="background: #1a1a1a; padding: 20px; border: 1px solid #e11d48; border-radius: 8px; margin: 20px 0;">
                        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
                        <p><strong>From:</strong> ${process.env.EMAIL_USER}</p>
                    </div>
                    <p style="margin-top: 20px; opacity: 0.7;">You're ready to deploy! 🚀</p>
                </div>
            `
        });
        
        console.log("✅ Email sent successfully!");
        console.log("   Message ID:", result.messageId);
        process.exit(0);
    } catch (error) {
        console.error("❌ Email test failed:", error.message);
        console.error("\nTroubleshooting:");
        console.error("1. Verify EMAIL_USER is set:", process.env.EMAIL_USER);
        console.error("2. Check EMAIL_PASS is a Google App Password (not your Gmail password)");
        console.error("3. Go to myaccount.google.com/apppasswords to generate one");
        console.error("4. Ensure 2-step verification is enabled on your Gmail");
        process.exit(1);
    }
};

testEmail();
