const db = require('../configDB.js');

const selectImagesAndProducts = (callback) => {
    db.all("SELECT p.id, p.name, p.code, p.price, p.description, p.brand, p.size, c.nameCategoria, i.url, AVG(r.rating) as rating FROM productos p INNER JOIN categoria c ON p.categoria_id = c.idCategoria LEFT JOIN imagenes i ON p.id = i.producto_id LEFT JOIN ratings r ON p.id = r.product_id WHERE i.destacado = 'si' GROUP BY p.id, p.name, p.code, p.price, p.description, p.brand, p.size, c.nameCategoria, i.url ",


        [], (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
}
const selectImagesAndProducts2 = (idImg, callback) => {
    db.all("SELECT p.name, p.code, p.price, p.description, p.brand, p.size, c.nameCategoria , i.url, i.destacado FROM productos p INNER JOIN categoria c ON p.categoria_id = c.idCategoria LEFT JOIN imagenes i ON p.id = i.producto_id  WHERE p.id = ?", [idImg]
        , (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
}

const selectImagesAndProducts3 = (idImg, callback) => {
    db.all("SELECT p.name, p.code, p.price, p.description, p.brand, p.size, c.nameCategoria , i.url FROM productos p INNER JOIN categoria c ON p.categoria_id = c.idCategoria LEFT JOIN imagenes i ON p.id = i.producto_id WHERE p.id = ? AND  i.destacado = 'si'",
        [idImg], (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
}
const selectImagesAndProductsRating = (callback) => {
    db.all("SELECT p.id, p.name, p.code, p.price, p.description, p.brand, p.size, c.nameCategoria, i.url, AVG(r.rating) as rating FROM productos p INNER JOIN categoria c ON p.categoria_id = c.idCategoria LEFT JOIN imagenes i ON p.id = i.producto_id LEFT JOIN ratings r ON p.id = r.product_id WHERE i.destacado = 'si' GROUP BY p.id, p.name, p.code, p.price, p.description, p.brand, p.size, c.nameCategoria, i.url order by rating desc ",


        [], (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
}

module.exports = {
    selectImagesAndProducts,
    selectImagesAndProducts2,
    selectImagesAndProducts3,
    selectImagesAndProductsRating
}