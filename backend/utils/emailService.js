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

async function sendForgotPassword(email, token) {
    const resetLink = `http://localhost:3000/reset-password/${token}`;  // Fixed link format

    const info = await transporter.sendMail({
        from: '"moneymoveseconomy" <moneymoveseconomy@gmail.com>',  // Sender address
        to: email,  // Recipient
        subject: "Change Password",  // Subject line
        text: `Click this link to reset your password: ${resetLink}`,  // Plain text body
        html: `<b>Click this link to reset your password:</b> <a href="${resetLink}">${resetLink}</a>`  // HTML body
    });

    console.log("Reset password email sent:", info.response);
}

module.exports.sendForgotPassword = sendForgotPassword;
