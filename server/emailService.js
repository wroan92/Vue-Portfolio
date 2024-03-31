import express from 'express';
require('dotenv').config();
import { createTransport } from 'nodemailer';
import { json } from 'body-parser';
const app = express();
import cors from 'cors';
const port = process.env.PORT || 8080;



var whitelist = ['https://anderswroldsen.com', 'http://localhost:4173'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(json());


const transporter = createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASSWORD
  }
});

app.post('/send-email', (req, res) => {
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