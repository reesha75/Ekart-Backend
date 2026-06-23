import nodemailer from "nodemailer";      // ← YEH MISSING THA
import dotenv from "dotenv";
dotenv.config();

export const verifyEmail = (token, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Hi! There, You have recently visited our website and entered your email.
           Please follow the given link to verify your email
           ${FRONTEND_URL}/verify/${token}
           Thanks`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailConfigurations, (error, info) => {
      if (error) {
        console.error('Email sending failed:', error);
        reject(error);
      } else {
        console.log('Email Sent Successfully');
        resolve(info);
      }
    });
  });
};