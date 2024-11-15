const db = require("../config/db");

exports.adminSettingsUpgradeUser = () => {
    const data = {
        title: "Admin settings"
    }

    return data;
}
exports.updateStackLimit = async function (newStackLimit, accessLevel) {
    const [affectedRows] = await db.execute("UPDATE Roles SET stackLimit = ? WHERE accessLevel = ?", [newStackLimit, accessLevel]);
    return affectedRows.affectedRows;
}