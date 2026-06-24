import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


export const sendOTPmail = async (otp, email) => {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});
const mailConfigurations = {

    // It should be a string of sender/server email
    from: process.env.MAIL_USER,
    to: email,  //user ka email jisko verify karna ha, wo email register karte waqt mile ga usko database ma save karna ha

    // Subject of Email
    subject: 'Password Reset OTP',
    
    // This would be the text of email body
    html: `
        <p>Hello,</p>
        <p>We received a request to reset your password. Your verification code is:</p>
        <h2 style="color: #4CAF50; font-size: 24px;">${otp}</h2>
        <p>This code is valid for <b>10 minutes</b>. If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>The Team</p>
    `
};
try {
    const info = await transporter.sendMail(mailConfigurations);
    console.log('Otp Sent Successfully');
    console.log(info);
    return info;
} catch (error) {
    console.error('Error sending email:', error);
    throw error;
}
}


