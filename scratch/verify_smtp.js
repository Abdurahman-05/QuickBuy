import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: "./server/.env" });

async function verifySMTP() {
  console.log("Checking Environment Variables...");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "******** (Hidden)" : "MISSING");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log("Verifying SMTP connection...");
    await transporter.verify();
    console.log("SMTP Connection verified successfully!");
    
    console.log("Attempting to send a real test email...");
    const info = await transporter.sendMail({
      from: `"Test Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to self
      subject: "QuickBuy SMTP Hard Test",
      text: "If you see this, email sending is working perfectly from this environment.",
    });
    
    console.log("Test email sent! messageId:", info.messageId);
    console.log("Response:", info.response);
  } catch (error) {
    console.error("SMTP TEST FAILED:");
    console.error(error);
  }
}

verifySMTP();
