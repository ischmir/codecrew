const db = require("../config/db");

exports.adminSettingsUpgradeUser = () => {
    const data = {
        title: "Admin settings"
    }

    return data;
}
exports.updateStackLimit = async function (newStackLimit, accessLevel) {
    const [result] = await db.execute("UPDATE Roles SET stackLimit = ? WHERE accessLevel = ?", [newStackLimit, accessLevel]);
    return result.affectedRows;
}

exports.upgradeUser = async function (userId, newRoleId) {
    const [result] = await db.execute("UPDATE Users SET FK_role = ? WHERE userId = ?", [newRoleId, userId])
    return result.affectedRows;
}