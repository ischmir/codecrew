const db = require("../config/db");

exports.adminSettingsUpgradeUser = async function() {    
    try {
        const [roles, fields] = await db.query("SELECT roleId, roleName FROM Roles");
        const [names] = await db.query("SELECT userId, firstName, lastName FROM Users")

        const data = {
            title: "Admin settings",
            roles, 
            names
        }
            
        return data;
    }
    catch (err) {
        const data = {
            title: "Admin settings"
        }
        console.log(err);
        
        return data
    }
}
exports.updateStackLimit = async function (newStackLimit, accessLevel) {
    const [result] = await db.execute("UPDATE Roles SET stackLimit = ? WHERE accessLevel = ?", [newStackLimit, accessLevel]);
    return result.affectedRows;
}

exports.upgradeUser = async function (userId, newRoleId) {
    const [result] = await db.execute("UPDATE Users SET FK_role = ? WHERE userId = ?", [newRoleId, userId])
    return result.affectedRows;
}
exports.bulkCreateUsersFromCSVToDB = async function (csvContent) {
    try {
        console.log('CSV Content:', csvContent);

        if (csvContent.length === 0) {
            throw new Error('Invalid CSV content');
        }
        
        const [result] = await db.query(
            `INSERT INTO Users (
                username,
                firstName,
                lastName,
                userEmail,
                userPassword,
                userExpirationDate,
                FK_role
            )
            VALUES ?`,
            [csvContent]
        );

        return result.affectedRows;
    } catch (error) {
        console.error('Error in bulkInsert:', error.message);
    }
};
