const db = require('../configDB.js');

const updateImg = (id, producto_id, url, destacado) => {
    db.run("UPDATE imagenes SET producto_id = ?, url = ?, destacado = ? WHERE id = ?", [producto_id, url, destacado, id], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    });
}
const updateCategoria = (idCategoria, nameCategoria) => {
    db.run("UPDATE categoria SET nameCategoria = ? WHERE idCategoria = ?", [nameCategoria, idCategoria], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    });
}
const update = (id, name, code, price, description, brand, size, categoria_id) => {
    db.run("UPDATE productos SET name = ?, code = ?, price = ?, description = ?, brand = ?, size = ?, categoria_id = ?  WHERE id = ?", [name, code, price, description, brand, size, categoria_id, id], function (err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
    });
}

module.exports = {
    updateImg,
    updateCategoria,
    update
}