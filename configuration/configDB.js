const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./configuration/sqlite3.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQLite database.');

    // Create the 'categoria' table
    db.run("CREATE TABLE IF NOT EXISTS categoria (idCategoria INTEGER PRIMARY KEY AUTOINCREMENT, nameCategoria TEXT NOT NULL)");

    // Create the 'productos' table
    db.run("CREATE TABLE IF NOT EXISTS productos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, code TEXT NOT NULL, price REAL NOT NULL, description TEXT NOT NULL, brand TEXT NOT NULL, size TEXT NOT NULL, categoria_id INTEGER, FOREIGN KEY(categoria_id) REFERENCES categoria(id))");

    // Create the 'imagenes' table
    db.run("CREATE TABLE IF NOT EXISTS imagenes (id INTEGER PRIMARY KEY AUTOINCREMENT, producto_id INTEGER, url TEXT NOT NULL, destacado BLOB NOT NULL, FOREIGN KEY(producto_id) REFERENCES productos(id))");

    // Create the 'users' table
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL)");

    /*db.run("DROP TABLE IF EXISTS ratings");*/
   
    db.run('CREATE TABLE IF NOT EXISTS ratings (id INTEGER PRIMARY KEY, user_id TEXT, product_id TEXT, rating INTEGER)');
     
    // Create the 'compras' table
    db.run(`CREATE TABLE IF NOT EXISTS compras (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id INTEGER, 
        producto_id INTEGER, 
        cantidad INTEGER NOT NULL, 
        fecha DATETIME DEFAULT CURRENT_TIMESTAMP, 
        ip_cliente TEXT, 
        id_transaccion TEXT, 
        total_pagado REAL, 
        description TEXT, 
        FOREIGN KEY(user_id) REFERENCES users(id), 
        FOREIGN KEY(producto_id) REFERENCES productos(id)
    )`);

});

module.exports = db;