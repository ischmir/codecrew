const templateM = require("../models/templateModel");

exports.allTemplates = async function(req, res) {

    res.render("template", await templateM.getAllTemplates())
}