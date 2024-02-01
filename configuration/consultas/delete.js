const db = require('../configDB.js');

const deletex = (iddp) => {
    db.run("DELETE FROM productos WHERE id = ?", [iddp],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
}
const delete2 = (iddc) => {
    db.run("DELETE FROM categoria WHERE idCategoria = ?;", [iddc],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
}
const delete4 = (iddx) => {
    db.run("DELETE FROM productos WHERE categoria_id = ?", [iddx],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
}
const delete3 = (iddi) => {
    db.run("DELETE FROM imagenes WHERE id = ?", [iddi],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`Row(s) updated: ${this.changes}`);
        });
}

module.exports = {
    deletex,
    delete2,
    delete4,
    delete3
}