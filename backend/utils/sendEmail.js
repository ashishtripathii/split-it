const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  if (!to) {
    console.error('Email not sent: No recipient address.');
    throw new Error('No recipient email address provided');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail email
      pass: process.env.EMAIL_PASS  // app password or env secret
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;
