const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: 'anders-wroldsen@live.com',
    pass: 'Nsam@neskollen92'
  }
});

const mailOptions = {
  from: 'anders-wroldsen@live.com',
  to: 'anders.wroldsen@gokstadakademiet.no',
  subject: 'Test E-post',
  text: 'Dette er en test e-post.'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('E-post sendt: ' + info.response);
  }
});
