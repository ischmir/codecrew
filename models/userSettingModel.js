const db = require("../config/db");

exports.CheckIfPasswordMatch = async (password, email) => {
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM Users WHERE userPassword = ? AND userEmail = ?", [password, email])

    if(rows[0].count > 0) {
        return true;
    }
    else {
        return false;
    }
}

exports.userSettings = () => {
    const data = {
        title: "Settings"
    }

    return data;
}

exports.accessibility = () => {
    const data = {
        title: "Settings"    
    }

    return data;
}

exports.userSettingsPassword = (message) => {
    const data = {
        message,
        title: "Settings"    
    }

    return data;
}