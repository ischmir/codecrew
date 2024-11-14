const dashboardM = require("../models/dashboardModel");

exports.dashboard = function (req, res) {
    res.render('dashboard', dashboardM.mockData());
}
exports.dashboardRedirect = function (req, res) {
    res.redirect("/dashboard")
}