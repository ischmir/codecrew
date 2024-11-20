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
        WHERE templateId = ?`, [id])
        
        return rows;
}
exports.updateTemplate = async function (id, newContent) {
    const [rows] = await db.query("UPDATE Templates SET templateContent = ? WHERE templateId = ?", [newContent, id])

    return rows;   
}