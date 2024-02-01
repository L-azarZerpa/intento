const express = require('express');
const db = require('../configuration/database');

const { selectCompras } = require('../configuration/consultasTask3/compra')
const { selectEmail } = require('../configuration/consultasTask3/usuario')

const router = express.Router();

require('dotenv').config()

router.post('/agregarImagenes', function (req, res, next) {
    let url = req.body.url
    let producto_id = req.body.producto_id
    let destacado = req.body.destacado
    let id = req.body.id;
    if (id) {
        if (destacado == "si" || destacado == "no") {
            db.updateImg(id, producto_id, url, destacado); // call update function
        }
    } else {
        if (destacado == "si" || destacado == "no") {
            db.insertImagen(producto_id, url, destacado) // call insert function
        }

    }
    res.redirect('/imagenes');
});

router.post('/agregarCategoria', function (req, res, next) {
    let nameCategoria = req.body.nameCategoria;
    let idCategoria = req.body.idCategoria
    if (idCategoria) {
        db.updateCategoria(idCategoria, nameCategoria); // call update function
    } else {
        db.insertCategoria(nameCategoria); // call insert function
    }
    res.redirect('/categoria');
});


router.post('/agregar', function (req, res, next) {
    let name = req.body.name;
    let code = req.body.code;
    let price = req.body.price;
    let description = req.body.description;
    let brand = req.body.brand;
    let size = req.body.size;
    let categoria_id = req.body.categoria_id


    let id = req.body.id; // new line to get id from request body
    if (id) {
        db.update(id, name, code, price, description, brand, size, categoria_id); // call update function
    } else {
        db.insert(name, code, price, description, brand, size, categoria_id); // call insert function
    }
    res.redirect('/admin');
});

router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login")
}, (req, res) => {
    db.select(function (productos) {
        db.selectCategoria(function (categorias) {
            db.selectImagen(function (imagenes) {
                res.render('admin', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
            });
        });
    });
});

router.get('/admin/agregar', (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login")
}, (req, res) => {
    db.select(function (productos) {
        db.selectCategoria(function (categorias) {
            db.selectImagen(function (imagenes) {
                res.render('agregar', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
            });
        });
    });
});

router.get('/admin/agregarCategoria', (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login")
}, (req, res) => {
    res.render('agregarCategoria', { title: 'Registros del formulario' });
});
router.get('/admin/agregarImagenes', (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login")
}, (req, res) => {
    res.render('agregarImagenes', { title: 'Registros del formulario' });
});


router.get('/admin/:id/actualizar', (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login")
}, (req, res) => {
    let idp = req.params.id
    console.log(idp);
    db.select2(idp, function (productos) {
        db.selectCategoria(function (categorias) {
            db.selectImagen(function (imagenes) {
                res.render('actualizar', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
            });
        });
    });
});


router.get('/admin/:id/delete', (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login")
}, (req, res) => {
    let iddp = req.params.id
    console.log(iddp);
    db.delete(iddp);
    db.select(function (productos) {
        db.selectCategoria(function (categorias) {
            db.selectImagen(function (imagenes) {
                res.render('admin', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
            });
        });
    });
});

router.get('/admin/:id/actualizarCat', (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login")
}, (req, res) => {
    let idc = req.params.id
    console.log(idc);
    db.select(function (productos) {
        db.selectCategoria2(idc, function (categorias) {
            db.selectImagen(function (imagenes) {
                res.render('actualizarCat', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
            });
        });
    });
});

router.get('/admin/:id/actualizarImg', (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login")
}, (req, res) => {
    let idImg = req.params.id
    console.log(idImg);
    db.select(function (productos) {
        db.selectCategoria(function (categorias) {
            db.selectImagen2(idImg, function (imagenes) {
                res.render('actualizarImg', { title: 'Registros del formulario', productos: productos, categorias: categorias, imagenes: imagenes });
            });
        });
    });
});


  
router.get('/compras', (req, res, next) => {
    if (req.isAuthenticated()) return next();

    res.redirect("/login")
}, (req, res) => {
    selectCompras(function (compras) {
         selectEmail(function (emal) {
        
        console.log(compras)
        res.render('compras', { title: 'Lista de compras', compras: compras,emal:emal });
    });
});
});


module.exports = router;  
