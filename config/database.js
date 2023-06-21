const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "logreg",
    port: "3306"
});

connection.connect();

console.log("DATABASE CONNECTED!")

module.exports = connection;