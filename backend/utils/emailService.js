const nodemailer = require("nodemailer"); 
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: "moneymoveseconomy@gmail.com",
      pass: "ktovzdlrsxydhrxt",
    },
  });

    async function  sendForgotPassword (email,token ){

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const info = await transporter.sendMail({
        from: '"moneymoveseconomy" <moneymoveseconomy@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Change Password", // Subject line
        text: "Click this link to reset your password: " + resetLink, // plain text body
        html: "<b>Click this link to reset your password: </b>" + resetLink, // html body
      });

  }
  
module.exports.sendForgotPassword= sendForgotPassword;