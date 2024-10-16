const nodemailer = require("nodemailer");
require("dotenv").config();

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8ec9102e4827a0",
    pass: "67ed753b8d36a5",
  },
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
