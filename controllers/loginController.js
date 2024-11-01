const loginM = require("../models/loginModel");

exports.login = function (req, res) {
    res.render("index");
}

exports.signup = function (req, res) {
    res.render("signup");
}

exports.forgot_password = function (req, res) {
    res.render("forgot_password");
}