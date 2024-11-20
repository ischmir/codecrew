const templateM = require("../models/templateModel");

exports.allTemplates = async function(req, res) {
    const message = req.session.message;
	delete req.session.message;

    res.render("template", await templateM.getAllTemplates(message))
}
exports.updateTemplate = async function (req, res) {
    const {templateId, newContent} = req.body

    if(!templateId) {
        throw new Error("There was no templateId with the request");
    }

    if(!newContent) {
        throw new Error("There was no newContent with the request")
    }
    const templateFromDB = (await templateM.getTemplateById(templateId))
    if(templateFromDB.length == 0) {
        // if save has been pressed, but no new content
        // how should we handle this?
        // with Toast? with red text? pretend it updated?
        
    }

    const result = await templateM.updateTemplate(templateId, newContent);
    if(result.affectedRows < 1) {
        // it didnt update in the db
        throw new Error("Nothing got updated")
    } 
    else {
        
        req.session.message = { type: "success", text: templateFromDB[0].templateTitle + " got updated" };
        res.redirect("/template") // TOAST
    }

}