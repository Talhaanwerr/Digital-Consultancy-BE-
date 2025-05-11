const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "stg2.stagingtestserver.com", // matches the cert
    port: 587, // submission port supports STARTTLS
    secure: false,
    auth: {
      user: "noreply@tcs.testdevlink.com",
      pass: 'K@+u9zkdPorY', // set this in your .env
    },
  });

  transporter.sendMail(
    {
      from: "noreply@tcs.testdevlink.com",
      to,
      subject,
      text,
    },
    (err, info) => {
      if (err) return console.log("Errorrrr: ", err);
      console.log("Message sent:", info);
    }
  );

  // const transporter = nodemailer.createTransport({
  //   host: 'localhost',
  //   port: 25,
  //   secure: false,             // no TLS inside the same server
  //   ignoreTLS: true
  // });

  // await transporter.sendMail({
  //   from: 'noreply@tcs.testdevlink.com',   // mailbox created in cPanel
  //   to,
  //   subject,
  //   text
  // });

  // const transporter = nodemailer.createTransport({
  //   service: "Gmail", // Or use another SMTP service
  //   auth: {
  //     user: process.env.MAIL_USER, // Your email address
  //     pass: process.env.MAIL_PASS, // App password
  //   },
  // });

  // const mailOptions = {
  //   from: process.env.MAIL_USER,
  //   to,
  //   subject,
  //   text,
  // };

  // await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
