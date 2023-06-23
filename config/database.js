const constant = {};

constant.PORT = 4567;

constant.DATABASE = {
    host: "localhost",
    user: "root",
    password: "",
    database: "logreg",
    port: "3306"
};

console.log("DATABASE CONNECTED!");
module.exports = constant;