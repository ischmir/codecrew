const loginM = require("../models/loginModel");

exports.login = function (req, res) {
    res.render("index", loginM.getAllUser());
}

exports.signup = function (req, res) {
    res.render("signup");
}