const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;
const db = require('../config/db')
require('dotenv').config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email_sender,
    pass: process.env.password_sender
  }
});

async function getEmailRecipients() {
  const [rows, fields] = await db.promise().query('SELECT email FROM Users WHERE email IS NOT NULL');
  return rows.map(row => row.email);
}

async function sendEmails() {
  const recipients = await getEmailRecipients();

  const mailOptions = {
    from: process.env.email_sender,
    to: recipients,
    subject: 'Test Email From NodeMailer',
    text: 'Hello World!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const taskEmail = new CronJob('55 22 15 * *', function () {
    console.log('run send email script')
    sendEmails();
});

module.exports = taskEmail