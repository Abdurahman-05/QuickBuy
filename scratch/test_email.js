import dotenv from "dotenv";
import { sendEmail } from "./server/config/email.js";

dotenv.config({ path: "./server/.env" });

async function testEmail() {
  try {
    console.log("Attempting to send test email...");
    await sendEmail({
      email: "test@example.com", // Replace with a real email to test
      subject: "QuickBuy Email Test",
      message: "This is a test email from QuickBuy."
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Test Email Failed:", error);
  }
}

testEmail();
