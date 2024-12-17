const templateM = require("../models/templateModel");
const yaml = require("js-yaml");

exports.allTemplates = async function(req, res) {
    const message = req.session.message;
	delete req.session.message;

    res.render("template", await templateM.getAllTemplates(message))
}
exports.createTemplate = async function (req, res) {
    const message = req.session.message;
	delete req.session.message;

    res.render("template_creation", await templateM.createTemplate(message));
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
        res.redirect("/template")
    }
}

exports.templateCreation = async function (req, res) {    
    try {
        let {title, content} = req.body
        
        if(!title) {
            throw new Error("Got no title. There needs to be a title");
        }
    
        if(!content) {
            throw new Error("Got no content. There needs to be some content")
        }

        content = String(content).replace(/,\s*$/gm, '');   // removes the trailing comma
        //yaml.load(content) // validating yaml content
    
        const result = await templateM.templateCreation(title, content);
    
        if(result.affectedRows < 1) {
            // it didnt update in the db
            throw new Error("Creation of new template failed")
        }         
        else {
        
        req.session.message = { type: "success", text: title + " Got created!" };
        res.redirect("/template")
    }
    } catch (error) {
        console.log(error);
        
        // let contentError = error.mark.buffer ? error.mark.buffer : "";
        req.session.message = { type: "danger", text: "Something went wrong with creation.", errMsg: error.reason, cachedTitle: req.body.title, cachedContent: ""/*contentError*/};
        console.error(error);
        res.redirect("/create_template");       
    }
}

exports.deleteTemplate = async function (req, res) {
    try {
        const {templateId} = req.body

        if(!templateId) {
            throw new Error("There was no templateId with the request");
        }
    
        const templateFromDB = (await templateM.getTemplateById(templateId))
        if(templateFromDB.length == 0) {
            // could not find any template with that id
        }
    
        const result = await templateM.templateDeletion(templateId);
        if(!result) {
            // should send a error to the site
            res.redirect("/template")
        }
        else if(result.affectedRows < 1) {
            // it didnt update in the db
            throw new Error("Nothing got updated")
        } 
        else {
            templateFromDB[0].templateTitle ? templateFromDB[0].templateTitle : ""
            req.session.message = { type: "success", text: templateFromDB[0].templateTitle + " got utterly destroyed" };
            res.redirect("/template")
        }    
    } catch (error) {
        req.session.errMsg = error;
        res.redirect("/template")
    }
    
}