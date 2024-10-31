const db = require("../config/db");

exports.getAllUser = async function() {
    const [rows, fields] = await db.query("");

};