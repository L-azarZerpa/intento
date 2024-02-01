var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { registerUser, getUserByEmail } = require('../configuration/consultasTask3/usuario.js');

const fetch = require('node-fetch');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/registro', function (req, res, next) {
  res.render('user/registro'); // assuming you have a view named 'register'
});

router.post('/registro', async function (req, res) {

  const { username, email, password, recaptchaResponse } = req.body;

  const recaptchaSecretKey = '6LclRFApAAAAAOPcCBRKFqgklXv0gYF6yGPXO5LB';
  const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaResponse}`;

  const recaptchaVerification = await fetch(recaptchaUrl, { method: 'POST' });
  const recaptchaData = await recaptchaVerification.json();

  if (!recaptchaData.success) {
    // La reCAPTCHA no se resolvió correctamente
    return res.status(400).json({ message: 'Invalid reCAPTCHA' });
  }

  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error hashing password' });
    }

    try {
      registerUser(username, email, hash);

      const token = jwt.sign({ username, email }, process.env.JWT_SECRETO, { expiresIn: '1h' });
      
    
    
      
      
      


      try {

        emailSubmit = async () => {
          const config = {
              host : 'smtp.gmail.com',
              port : 587,
              auth : {
                  user : process.env.USER,
        
                  pass : process.env.PASS
              }
          }
      const mensaje = {
        from : process.env.USER,
        to : username,
        subject : 'formulario programacion2',
        text : ' bienvenido usuario: ' + username 
      }
      const transport = nodemailer.createTransport(config);
      const info = await transport.sendMail(mensaje);
      
      console.log(info);
      } 
      
      emailSubmit();
      } catch (error) {
      console.error(error);
      }
      







      
      console.log(token);
      res.json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error registering user' });
    }
  });
});

router.get('/login', function (req, res, next) {
  res.render('user/login');
});

router.post('/login', async function (req, res) {
  const { email, password } = req.body;

  getUserByEmail(email, function (err, user) {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching user', error: err.message });
    }

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error comparing passwords', error: err.message });
      }

      if (!result) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ username: user.username, email }, process.env.JWT_SECRETO, { expiresIn: '1h' });

      res.json({ message: 'User logged in successfully', token });
    });
  });
});


module.exports = router;
