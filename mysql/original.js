const mysql = require ("mysql2");
require('dotenv').config();
  
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.USER,
  database: "bookshop",
  password: process.env.PASSWORD
});

// тестирование подключения
connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
});

module.exports = connection;

// // запрос 
// connection.query('SELECT 1 + 1 AS solution', function(error, results, fields) {
//     if (error) throw error;
//     console.log('Правильный ответ: ', results[0].solution);
// });

// // закрытие подключения
// connection.end(function(err) {
//   if (err) {
//     return console.log("Ошибка: " + err.message);
//   }
//   console.log("Подключение закрыто");
// });