const nodemailer = require("nodemailer");
require("dotenv").config();

// Looking to send emails in production? Check out our Email API/SMTP product!
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "42144dd409f0f9",
    pass: "282ba90ae82636"
  }
});

const sendEmail = async (userEmail, code = "") => {
  return await transport.sendMail({
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: userEmail,
    subject: "Welcome to FC Event app",
    html: `<h1>Hello ${
      userEmail.split("@")[0]
    }. Welcome to our Super app. Your code is : ${code} </h1>`,
  });
};
module.exports = { sendEmail };
