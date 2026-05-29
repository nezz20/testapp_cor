const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'color_system'
});

connection.connect((err) => {
  if (err) {
    console.log('Erro MySQL:', err);
  } else {
    console.log('MySQL conectado');
  }
});

module.exports = connection;