const dashboardM = require("../models/dashboardModel");

exports.dashboard = function (req, res) {
    console.log(dashboardM.mockData());
    
    res.render('dashboard', dashboardM.mockData());
}