const loginM = require("../models/loginModel");

exports.login = function (req, res) {
    res.render("index");
}

exports.signup = function (req, res) {
    res.render("signup");
}