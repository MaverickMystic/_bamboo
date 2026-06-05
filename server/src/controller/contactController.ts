import express from "express";
import nodemailer from "nodemailer";
import { contactSchema } from "../schema/contact.schema.ts";


export const sendContactEmail = async (req: express.Request, res: express.Response) => {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
      console.log("[contact] Validation errors:", errors); 
    return res.status(400).json({ message: "Validation failed", errors });
  }

  const { name, email, message } = result.data;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
  try {
  
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: message,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("[contact] Email send failed:", err);
    return res.status(500).json({ message: "Failed to send email. Try again later." });
  }
};