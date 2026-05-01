import nodemailer from "nodemailer";


console.log(process.env.EMAIL)
console.log(process.env.PASS)
const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendEmail = async (to,subject,text)=>{
      await transporter.sendMail({
      from:process.env.EMAIL,
      to,
      subject,
      text
      })
}