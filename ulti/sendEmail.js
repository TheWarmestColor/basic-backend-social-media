const nodemailer = require("nodemailer")
require('dotenv').config() //Pulling out the enviroment variables
const email = process.env.MY_EMAIL
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD
    }
});

mailOptions = {
    from: process.env.MY_EMAIL,
    to: process.env.MY_EMAIL,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
transporter.sendMail(mailOptions, function(err, info){
    if (err){
        console.log(err);
    }
    else{console.log('Email sent: ' + info.response)}
})