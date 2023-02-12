const nodemailer = require('nodemailer');
const cron = require('cron');

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
      user: 'you@example.com',
      pass: 'password'
    }
  });

  const today = new Date();
  if (today.getDate() === 25) {
    const mailOptions = {
      from: 'you@example.com',
      to: 'recipient@example.com',
      subject: 'Daily Email',
      text: 'This is a daily email sent on the 25th day of the month.'
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
    } catch (error) {
      console.error(error);
    }
  }
}

const cronJob = new cron.CronJob({
  cronTime: '0 0 * * 25',
  onTick: sendEmail,
  timeZone: 'Asia/Bangkok'
});

// cronJob.start();

module.exports = cronJob