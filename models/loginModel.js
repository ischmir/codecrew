const db = require("../config/db");
const headerM = require("../models/headerModel")

exports.getSingelUserForLogin = async function(userEmail, userPassword) {
    
    const [rows, fields] = await db.query(`
        SELECT 
            Users.userId, 
            Roles.accessLevel, 
            userEmail, 
            username, 
            userPassword, 
            firstName, 
            lastName 
        FROM Users
        INNER JOIN Roles ON Users.FK_role = Roles.roleId

        WHERE userEmail = "?" AND userPassword = "?";
        `, 
        [userEmail, userPassword]);
        
    return rows;
}