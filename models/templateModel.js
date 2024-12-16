const db = require("../config/db");
const extraM = require("../models/extraModel");

exports.getAllTemplates = async function(message) {
    const [templates, fields] = await db.query(`SELECT 
        templateId, 
        templateTitle, 
        templateContent, 
        templateCreationDate AS creationDate,
        templateLastUpdate AS lastUpdate
        FROM Templates`);
    
    templates.forEach((d) => {
        d.creationDate = extraM.convertingDateFormat(d.creationDate),
        d.lastUpdate = extraM.convertingDateFormat(d.lastUpdate)
    });
    const data = {
        title: "Template",
        templates,
        message
    }
    
    return data;
};
exports.getAllTemplatesIdAndTitle = async function () {
    const [templates, fields] = await db.query(`SELECT 
        templateId, 
        templateTitle
        FROM Templates`);
    
    return templates;
}
exports.getTemplateById = async function (id) {
    const [rows] = await db.query(`SELECT 
        templateId, 
        templateTitle, 
        templateContent, 
        templateCreationDate AS creationDate,
        templateLastUpdate AS lastUpdate
        FROM Templates
        WHERE templateId = ?`, [id]);
        
        rows.forEach((d) => {
            d.creationDate = extraM.convertingDateFormat(d.creationDate),
            d.lastUpdate = extraM.convertingDateFormat(d.lastUpdate)
        });
        return rows;
}
exports.updateTemplate = async function (id, newContent) {
    const lastUpdate = new Date()
    const [rows] = await db.query("UPDATE Templates SET templateContent = ?, templateLastUpdate = ? WHERE templateId = ?", [newContent, lastUpdate, id])

    return rows;   
}
exports.createTemplate = async function (message) {
    let data = {
        title: "Create template",
        message
    }

    return data;
}
exports.templateCreation = async function (title, content) {
    const dates = new Date();

    const [rows] = await db.execute("INSERT INTO Templates (templateTitle, templateContent, templateCreationDate, templateLastUpdate) VALUES (?,?,?,?)", 
        [title, content, dates, dates ])

    return rows;
}
exports.templateDeletion = async function (id) {
    const [rows] = await db.execute("DELETE FROM Templates WHERE templateId = ?", [id])

    return rows;
}


exports.replacePlaceholder = async function (id, domain) {
    const generateRandomString = (length) => {
        let result = '';
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    
    try {
        const [rows] = await db.query(`
            SELECT 
                REPLACE(REPLACE(REPLACE(templateContent, 'CHANGEME', ?), 'SUBDOMAIN01', ?), 'SUBDOMAIN02', ?) AS updatedContent
            FROM Templates WHERE templateId = ?;
        `, [generateRandomString(5), domain, generateRandomString(5), id]); // det er vist kun SUBDOMAIN01 som skal være det som brugeren skriver. resten skal være random. skal lige dobbelt tjekkes

        if (!rows[0]) {
            throw new Error(`No template found with id: ${id}`);
        }
        console.log(rows[0].updatedContent);
        
        return rows[0].updatedContent;
    } catch (error) {
        console.error("Error in replacePlaceholder:", error.message);
        throw error;
    }
}