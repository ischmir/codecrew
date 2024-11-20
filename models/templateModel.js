const db = require("../config/db");

exports.getAllTemplates = async function(message) {
    const [templates, fields] = await db.query(`SELECT 
        templateId, 
        templateTitle, 
        templateContent, 
        DATE_FORMAT(templateCreationDate, '%Y %m %d %H:%i:%s') AS creationDate,
        DATE_FORMAT(templateLastUpdate, '%Y %m %d %H:%i:%s') AS lastUpdate
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
        DATE_FORMAT(templateCreationDate, '%Y %m %d %H:%i:%s') AS creationDate,
        DATE_FORMAT(templateLastUpdate, '%Y %m %d %H:%i:%s') AS lastUpdate
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