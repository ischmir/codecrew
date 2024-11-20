const templateM = require("../models/templateModel");

exports.allTemplates = async function(req, res) {

    res.render("template", await templateM.getAllTemplates())
}
exports.updateTemplate = async function (req, res) {
    const {templateId, newContent} = req.body

    if(!templateId) {

    }

    if(!newContent) {

    }

    if(await templateM.getTemplateById(templateId)) {
        // if save has been pressed, but no new content
    }

    const result = await templateM.updateTemplate(templateId, newContent);
    if(result.affectedRows < 1) {
        // it didnt update in the db
    }
    res.redirect("/template") // TOAST
}