const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const ENV = require('../config');

let nodeConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: ENV.EMAIL, // generated ethereal user
    pass: ENV.PASSWORD, // generated ethereal password
  },
};


let transporter = nodemailer.createTransport(nodeConfig);

let mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Mailgen',
    link: 'https://mailgen.js/',
  },
});

/* POST http://localhost:3001/api/registerMail */
const registerMail = async (req, res) => {
  const { username, text, userEmail, subject } = req.body;

  let email = {
    body: {
      name: username,
      intro:
        text || "Welcome to Mailgen! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  let emailBody = mailGenerator.generate(email);
  let message = {
    from: process.env.email,
    to: userEmail,
    subject: subject || 'Signup successfull',
    html: emailBody,
  };

  try {
    await transporter.sendMail(message);
    return res
      .status(200)
      .send({ msg: 'you should have recieved mail form us..!' });
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = registerMail;
