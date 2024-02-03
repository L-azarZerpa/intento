const db = require('../configDB.js');

function registerUser(username, email, password) {
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  db.run(sql, [username, email, password], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`User registered with ID: ${this.lastID}`);
  });
}

function updatePassword(password,id)  {
  const sql = `UPDATE users SET password = ? WHERE id = ?`;

  db.run(sql, [password,id], function (err) {
      if (err) {
          return console.log(err.message);
      }
      console.log(`Row(s) updated: ${this.changes}`);
  });
}

function getUserByEmail(email, callback) {
  const sql = `SELECT * FROM users WHERE email = ?`;

  db.get(sql, [email], function (err, row) {
    if (err) {
      return callback(err);
    }

    callback(null, row);
  });
}

function getUserById(id, callback) {
  const sql = `SELECT * FROM users WHERE id = ?`;

  db.get(sql, [id], function (err, row) {
    if (err) {
      return callback(err);
    }

    callback(null, row);
  });
}

const selectEmail = (callback) => {
  let sql = "SELECT * FROM users";
  db.all(sql, [], (err, rows) => {
      if (err) {
          throw err;
      }
      callback(rows);
  });
}


module.exports = {
  registerUser,
  updatePassword,
  getUserByEmail,
  getUserById,
  selectEmail
};