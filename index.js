const express = require("express");
const path = require("path");
const nodemailer = require('nodemailer');
const dotenv = require("dotenv").config();
const app = express();
const staticPath = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

// === === add password to your email === ===

app.use(express.static(staticPath));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/contact', (req, res) => {

      var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                  user: 'pawanpratap2008@gmail.com',
                  pass: process.env.PWDs
            }
      });

      var mailOptions = {
      from: 'pawanpratap2008@gmail.com',
      to: 'pawanpratap2008@gmail.com',
      subject: 'Form submited at Website',
      html: `
            <h1>New user has been submited a form on your website. His/her details are here:</h1>
            <b>Name</b> - ${req.body.personName}<br>
            <b>Phone Number</b>  - ${req.body.phoneNo}<br>
            <b>Bike Company</b> - ${req.body.bikeCompany}<br>
            <b>question</b> - ${req.body.question}<br>
      `
      };

      transporter.sendMail(mailOptions, function(error, info){});
});

app.get("/", (req, res) => {
	res.send("home page");
})

app.get("*", (req, res) => {
	res.sendFile(path.join(staticPath, "404/index.html"));
})

app.listen(port);

// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');

// var transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'pawanpratap2008@gmail.com',
//     pass: process.env.PWD
//   }
// });

// var mailOptions = {
//   from: 'pawanpratap2008@gmail.com',
//   to: 'pawanpratap2008@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });