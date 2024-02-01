const db = require('../configDB.js');

const insert = (name, code, price, description, brand, size, categoria_id) => {
    db.run("INSERT INTO productos (name, code, price, description, brand, size, categoria_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [name, code, price, description, brand, size, categoria_id], function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}
const insertCategoria = (nameCategoria) => {
    db.run("INSERT INTO categoria (nameCategoria) VALUES (?)", [nameCategoria], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

const insertImagen = (producto_id, url, destacado) => {
    db.run("INSERT INTO imagenes (producto_id, url, destacado) VALUES (?, ?, ?)", [producto_id, url, destacado], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

const insertRating = (token, idProducto, value) => {
    db.run('INSERT INTO ratings (user_id, product_id, rating) VALUES (?, ?, ?)', [token, idProducto, value], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

module.exports = {
    insert,
    insertCategoria,
    insertImagen,
    insertRating
}