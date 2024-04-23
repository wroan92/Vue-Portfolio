import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

// CORS-hviteliste og konfigurasjon
var whitelist = ['https://anderswroldsen.com', 'http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// Bruk av middleware
app.use(cors(corsOptions));
app.use(express.json());


const transporter = nodemailer.createTransport({
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