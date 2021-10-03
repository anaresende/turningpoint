const nodemailer = require("nodemailer");

const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
  name: "mail.example.com", // mail.example.com or smtp.mail.com
  host: "mail.example.com", // mail.example.com or smtp.mail.com
  port: 465,
  secure: true,
  logger: true,
  //debug: true,
});

module.exports.sendConfirmationEmail = (username, email, confirmationCode) => {
  return transport.sendMail(
    {
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${username}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=${process.env.SITE_URL}/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
    },
    (error, info) => {
      console.log("send mail", error, info);
    }
  );
  // .catch((err) => console.log("why bitch", err));
};
