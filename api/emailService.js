const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  require('dotenv').config();
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: 'Anders-wroldsen@live.com',
    subject: 'Ny kontakt meg melding fra portefølje-nettsiden',
    text: `Navn: ${name}\nE-post: ${email}\nMelding: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-post sendt: ' + info.response);

    const confirmationMailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Takk for din henvendelse',
      text: `Hei ${name},\n\nTakk for din henvendelse. Vi har mottatt din melding og vil ta kontakt med deg snart.\n\nMed vennlig hilsen,\nAnders Wroldsen`,
    };

    await transporter.sendMail(confirmationMailOptions);
    console.log('Sendt bekreftelse til e-post: ' + email);

    res.status(200).send('E-post sendt: ' + info.response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.toString());
  }
};