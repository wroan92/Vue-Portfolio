const express = require('express');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3000;


app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD
  }
});

app.post('/sendEmail', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'Anders-wroldsen@live.com',
    subject: 'Ny kontakt meg melding fra portefølje-nettsiden',
    text: `Navn: ${name}\nE-post: ${email}\nMelding: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send(error.toString());
    }

    const confirmationMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Takk for din henvendelse',
      text: `Hei ${name},\n\nTakk for din henvendelse. Vi har mottatt din melding og vil ta kontakt med deg snart.\n\nMed vennlig hilsen,\nAnders Wroldsen`,
    };

    transporter.sendMail(confirmationMailOptions, (confirmError, confirmInfo) => {
      if (confirmError) {
        console.error(confirmError);
      } else {
        console.log('Sendt bekreftelse til e-post: ' + email);
      }
    });

    res.status(200).send('E-post sendt: ' + info.response);
  });
});


app.listen(port, () => {
  console.log(`Server kjører på port:${port}`);
});