const db = require("../config/db");

exports.adminSettingsUpgradeUser = async function() {    
    try {
        const [roles, fields] = await db.query("SELECT roleId, roleName FROM Roles");
        const [names] = await db.query("SELECT userId, firstName, lastName FROM Users")
        console.log(names);
        
        const data = {
            title: "Admin settings",
            roles, 
            names
        }
            console.log(data);
            
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