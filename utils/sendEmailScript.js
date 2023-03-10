const nodemailer = require('nodemailer');
const cron = require('cron');

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your_email@gmail.com',
//     pass: 'your_email_password'
//   }
// });

// async function getEmailRecipients() {
//   const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'your_database_username',
//     password: 'your_database_password',
//     database: 'your_database_name'
//   });

//   const [rows, fields] = await connection.execute('SELECT email FROM recipients');
//   return rows.map(row => row.email);
// }

// async function sendEmails() {
//   const recipients = await getEmailRecipients();

//   const mailOptions = {
//     from: 'your_email@gmail.com',
//     to: recipients,
//     subject: 'Test Email',
//     text: 'Hello World!'
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// }

// // Schedule a cron job to execute the sendEmails function every day at 12:00:00 PM on the 15th of the month
// cron.schedule('0 12 15 * *', function() {
//   sendEmails();
// });

// module.exports = cronJob