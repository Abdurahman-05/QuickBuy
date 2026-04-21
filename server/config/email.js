import nodemailer from "nodemailer";

/**
 * Send an email using nodemailer
 * @param {Object} options - { email, subject, message }
 */
export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"QuickBuy Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html, // Optional: handle HTML content
  };

  await transporter.sendMail(mailOptions);
};
