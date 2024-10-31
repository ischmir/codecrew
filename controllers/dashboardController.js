const dashboardM = require("../models/dashboardModel");

exports.dashboard = function (req, res) {  
    res.render('dashboard', dashboardM.mockData());
}