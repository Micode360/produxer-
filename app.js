const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
const { body, check, validationResult } = require('express-validator');

require('dotenv').config();

app.use(express.json());

app.use(cors());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT || 5288;

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/views'));

app.get('/', (req,res) => {
   res.sendFile('index.html');
});

app.get('/contacts', (req,res)=>{
    res.sendFile(`${process.cwd()}/views/contacts.html`);
 });


 app.get('/soundkits', (req,res)=>{
    res.sendFile(`${process.cwd()}/views/soundkits.html`);
 });


 app.get('/login', (req,res)=>{
    res.sendFile(`${process.cwd()}/views/login.html`);
 });

 app.get('/signup', (req,res)=>{
  res.send('Sign up page yet to be created')
});

 

 app.post('/client/message/route',(req,res) => {
      let temp = `
      <h3>${req.body.firstName}</h3>
      <h4>${req.body.lastName}</h4>
      <h4>${req.body.email}</h4>
      <h4>${req.body.subject}</h4>
      <p>${req.body.message}</p>
   `;
      
   console.log({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });

    main(temp).catch(console.error);

}); 


async function main(temp) {

  let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    // secure: false, 
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: process.env.HOST, // list of receivers
    subject: "Message from mr produxersta Website", // Subject line
    text: "not text yet", // plain text body
    html: temp, // html body
  });

//  console.log("Message sent: %s", info.messageId);
  console.log('Message sent');
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}





app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
});
