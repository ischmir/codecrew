const db = require("../config/db");

exports.getAllTemplates = async function() {
    const [templates, fields] = await db.query("SELECT * FROM Templates");

    const data = {
        title: "Template",
        templates
    }    
    console.log(data);
    
    return data;
};