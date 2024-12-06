const db = require("../config/db");

exports.getAllTemplates = async function(message) {
    const [templates, fields] = await db.query(`SELECT 
        templateId, 
        templateTitle, 
        templateContent, 
        DATE_FORMAT(templateCreationDate, '%d %m %Y') AS creationDate,
        DATE_FORMAT(templateLastUpdate, '%d %m %Y %H:%i:%s') AS lastUpdate
        FROM Templates`);
    
    const data = {
        title: "Template",
        templates,
        message
    }
    
    return data;
};
exports.getTemplateById = async function (id) {
    const [rows] = await db.query(`SELECT 
        templateId, 
        templateTitle, 
        templateContent, 
        DATE_FORMAT(templateCreationDate, '%d %m %Y') AS creationDate,
        DATE_FORMAT(templateLastUpdate, '%d %m %Y %H:%i:%s') AS lastUpdate
        FROM Templates
        WHERE templateId = ?`, [id])        // Javascript ser funky på måden den skal konventere DATETIME fra databasen. 
                                            // JS: Tue Oct 29 2024 00:00:00 GMT+0100 (Centraleuropæisk normaltid)
                                            // DB: 2024-10-29T00:00:00.000Z
                                            // Med den her konventering fra DB: 2024 10 29 00:00:00
        
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
    try {
        const [rows] = await db.query(`
            SELECT 
                REPLACE(REPLACE(templateContent, 'CHANGEME', ?), 'SUBDOMAIN', ?) AS updatedContent
            FROM Templates WHERE templateId = ?;
        `, [domain, domain, id]);

        if (!rows[0]) {
            throw new Error(`No template found with id: ${id}`);
        }

        return rows[0].updatedContent;
    } catch (error) {
        console.error("Error in replacePlaceholder:", error.message);
        throw error;
    }
}