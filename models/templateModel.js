const db = require("../config/db");

exports.getAllUser = async function() {
    const [rows, fields] = await db.query("SELECT * FROM Templates");

    console.log(rows);
    
    return rows;
};