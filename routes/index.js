var express = require('express');
const db = require('../configuration/database');
const jwt = require('jsonwebtoken');
var router = express.Router();
const { getUserByEmail } = require('../configuration/consultasTask3/usuario.js');
const nodemailer = require('nodemailer');
const { htmlRecuperacion } = require('../views/htmlRecuperation/html.js');


require('dotenv').config()


router.get('/', function (req, res, next) {
  
    db.selectImagesAndProducts(function (productosConImagenes) {
      db.selectCategoria(function (categorias) {
       
          
        res.render('index', { title: 'Registros del formulario', productosConImagenes: productosConImagenes, categorias: categorias, });
      });
    
    
})
  
});

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy

router.use(express.urlencoded({ extended: true }));

router.use(cookieParser('mi'));

router.use(session({
  secret: 'mi',
  resave: true,
  saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new PassportLocal(function (username, password, done) {
  if (username === process.env.NOMBRE && password === process.env.CONTRASENA)
    return done(null, { id: 1, name: "cody" })
  done(null, false)
}))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  done(null, { id: 1, name: "cody" })
})

router.get("/login", (req, res) => {
  res.render('login', { title: 'login' });
})

router.post("/login", passport.authenticate('local', {
  successRedirect: "/admin",
  failureRedirect: "/login"
}))

router.get('/categoria/:id/delete', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/login")
}, (req, res) => {
  let iddc = req.params.id
  console.log(iddc);
  db.delete2(iddc);
  let iddx = req.params.id
  console.log(iddx);
  db.delete4(iddx);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('categoria', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});

router.get('/imagenes/:id/delete', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/login")
}, (req, res) => {
  let iddi = req.params.id
  console.log(iddi);
  db.delete3(iddi);
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('imagenes', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});


router.get('/categoria', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/login")
}, (req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('categoria', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});
router.get('/imagenes', (req, res, next) => {
  if (req.isAuthenticated()) return next();

  res.redirect("/login")
}, (req, res) => {
  db.select(function (productos) {
    db.selectCategoria(function (categorias) {
      db.selectImagen(function (imagenes) {
        res.render('imagenes', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
      });
    });
  });
});

router.get('/producto/:id', (req, res, next) => {
  let idImg = req.params.id
  console.log(idImg);
  db.selectImagesAndProducts3(idImg, function (productosConImagenes3) {
    db.selectImagesAndProducts2(idImg, function
      (productosConImagenes2) {
      db.selectCategoria(function (categorias) {
        res.render('producto', { title: 'Registros del formulario', productosConImagenes3: productosConImagenes3, productosConImagenes2: productosConImagenes2, categorias: categorias });
      });
    });
  })

});
router.get('/stre', (req, res, next) => {
  db.selectratings2( function (emal) {
  res.render('stre', { title: 'Registros del formulario',emal:emal});
  })
    
});

router.get('/rating', (req, res, next) => {
 
    res.render('rating', { title: 'Registros del formulario'});
});
     
     
router.get('/rating2/:id', (req, res, next) => {
  let idImg = req.params.id
  console.log(idImg);
  db.selectImagesAndProducts3(idImg, function (productosConImagenes3) {
    db.selectImagesAndProducts2(idImg, function
      (productosConImagenes2) {
      db.selectCategoria(function (categorias) {
        res.render('rating2', { title: 'Registros del formulario', productosConImagenes3: productosConImagenes3, productosConImagenes2: productosConImagenes2, categorias: categorias });
      });
    });
  })

  }); 


  router.post("/rat", (req, res) => {
    const { value, token, idProducto } = req.body;
    const { JWT_SECRETO } = process.env;
    console.log(`Selected stars: ${value}`);
    try {
      const decoded = jwt.verify(token, JWT_SECRETO);
      console.log('Token verified:', decoded.email);
      getUserByEmail(decoded.email, (err, row) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return;
        }

        if (row) {
            //aqui se puede utilizar el id

          console.log(row.id);  
          db.selectratings(row.id,idProducto, function (r) {
            console.log(r);
            if (r.length === 0) {
              db.insertRating(row.id, idProducto, value);
              res.redirect('/');
            }
          });  
        } else {
            console.log('No se encontró un usuario con ese correo electrónico')
            res.status(500).json({ status: 'error', message: 'Error al procesar el pago' });
        }
    });
    } catch (error) {
            console.log('Token verification failed:', error.message);
    }
          });
    
  
    
 
    
    /*db.selectratings(token, idProducto, function (r) {
      console.log(r);
      if (r.length === 0) {
        db.insertRating(token, idProducto, value);
      }
    }); */

      /*db.selectratings( function (r) {
      console.log(r);*/
  
   

    
    /*const p = req.body.value;
    const { pio, token, idProducto } = req.body;
    console.log(`Selected stars: ${p}`);
    console.log(req.body);
  
    */
  /*
    let token2, idProducto2, value2
    token2 = "3"  
    idProducto2 = "3" 
    value2 = 9

    db.insertRating(token2, idProducto2, value2)
    
    */
 


    router.get('/pro', (req, res, next) => {
      res.render('pro', { title: 'Registros del formulario'});
    });

    
    router.post('/pro', function (req, res, next) {
      
      try {
        const { JWT_SECRETO } = process.env;
        let email = req.body.email;
    
        getUserByEmail(email, (err, row) => {
          if (err) {
              console.error('Error al buscar usuario:', err);
              return;
          }
  
          if (row) {
              //aqui se puede utilizar el id
              const user = row

              if (!user) {
                return res.status(404).json({ message: "usuario no encontrado"})
              }
              const token = jwt.sign({ id : user.id},JWT_SECRETO,{
                expiresIn: "1h",
                
              })
              
              emailSubmit = async () => {
                const config = {
                    host : 'smtp.gmail.com',
                    port : 587,
                    auth : {
                        user : process.env.USER,
              
                        pass : process.env.PASS
                    }
                }
                console.log("token: ", token);
            const mensaje = {
              from : process.env.USER,
              to : user.email,
              subject : 'recuperacion de contraseña',
              html : htmlRecuperacion(user.username,token,"u") 
            }
            console.log(mensaje);
            const transport = nodemailer.createTransport(config);
            const info = await transport.sendMail(mensaje);
            
            console.log(info);
            } 
            
          emailSubmit();
            
            
          } else {
              console.log('No se encontró un usuario con ese correo electrónico')
              res.status(500).json({ status: 'error', message: 'Error al procesar el pago' });
          }
      }); 
      
      } catch (error) {
      console.error(error);
      }
    
  });











module.exports = router;  