import { createTransport } from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: process.env.MY_MAIL,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}