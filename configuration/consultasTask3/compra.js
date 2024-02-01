const db = require('../configDB.js');


const savePurchase = (data, callback) => {
    const sql = `
        INSERT INTO compras (description, user_id, producto_id, cantidad, ip_cliente, id_transaccion, total_pagado)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [data.description, data.user_id, data.producto_id, data.cantidad, data.ip_cliente, data.id_transaccion, data.total_pagado];

    db.run(sql, params, function (err) {
        if (err) {
            return callback(err);
        }

        callback(null, this.lastID);
    });
}

const selectCompras = (callback) => {
    let sql = "SELECT * FROM compras";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
}

module.exports = { savePurchase, selectCompras };

