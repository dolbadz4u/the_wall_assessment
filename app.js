const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const routes = require("./routes/routes.js");

app.use(express.static(__dirname + "/assets"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true
}));
app.use(routes);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.listen(4567);