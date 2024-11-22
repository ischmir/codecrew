const templateM = require("../models/templateModel");
const yaml = require("js-yaml");

exports.allTemplates = async function(req, res) {
    const message = req.session.message;
	delete req.session.message;

    res.render("template", await templateM.getAllTemplates(message))
}
exports.createTemplate = async function (req, res) {
    res.render("template_creation", await templateM.createTemplate());
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
    let {title, content} = req.body

    if(!title) {
        throw new Error("Got no title. There needs to be a title");
    }

    if(!content) {
        throw new Error("Got no content. There needs to be some content")
    }

    content = String(content).replace(/,\s*$/gm, '');   // removes the trailing comma
    const yamlValid = yaml.load(content)                // validating yaml content
    const ehh = yaml.dump(yamlValid);                   // makes the content to be raw yaml string, so we can store it correctly eg. without \r\n but still formated. 
                                                        // app:\r\n  name: Kubelab\r\n  environment: production\r\n  logging:\r\n    level: info
                                                        // VS
                                                        // services:
                                                        //   web:
                                                        //   image: nginx
                                                        //   ports:
                                                        //     - '80:80'
                                                        //   sssssssss: yea


    const result = await templateM.templateCreation(title, ehh);

    if(result.affectedRows < 1) {
        // it didnt update in the db
        throw new Error("Creation of new template failed")
    } 
    else {
        
        req.session.message = { type: "success", text: title + " Got created!" };
        res.redirect("/template")
    }
}