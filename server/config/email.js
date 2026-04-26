import nodemailer from "nodemailer";

/**
 * Send an email using nodemailer
 * @param {Object} options - { email, subject, message, html }
 */
export const sendEmail = async (options) => {
  console.log(`[Email Service] Preparing to send email to: ${options.email}`);
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("[Email Service] CRITICAL ERROR: EMAIL_USER or EMAIL_PASS environment variables are missing.");
    throw new Error("Email service not configured - check environment variables.");
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Verify connection configuration
  try {
    console.log("[Email Service] Verifying transporter connection...");
    await transporter.verify();
    console.log("[Email Service] Transporter verified successfully.");
  } catch (verifyError) {
    console.error("[Email Service] SMTP Verification Failed:", verifyError.message);
    throw new Error(`Email SMTP Verification Failed: ${verifyError.message}`);
  }

  const mailOptions = {
    from: `"QuickBuy Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  // Send the actual mail
  try {
    console.log("[Email Service] Sending mail now...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log("[Email Service] Email sent successfully!");
    console.log("[Email Service] Message ID: %s", info.messageId);
    console.log("[Email Service] Response: %s", info.response);
    
    return info;
  } catch (sendError) {
    console.error("[Email Service] FAILED to send email to %s:", options.email);
    console.error("[Email Service] Full SMTP Error:", sendError);
    
    // Explicitly re-throw to be caught by the controller
    throw new Error(`SMTP Send Error: ${sendError.message}`);
  }
};
