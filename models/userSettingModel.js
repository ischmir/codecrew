const db = require("../config/db");

exports.CheckIfPasswordMatch = async (password, email) => {
    const [rows] = await db.query("SELECT COUNT(*) AS count FROM Users WHERE userPassword = ? AND userEmail = ?", [password, email])
    console.log(rows);
    
    if(rows[0].count > 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.UpdatePassword = async (password, email, currPassword) => {
    try {        
        const [rows] = await db.execute("UPDATE Users SET userPassword = ? WHERE userEmail = ? AND userPassword = ?", [password, email, currPassword])
        return rows;
    } catch (error) {
        console.log("couldn't change the password. ERROR: " + error);
        
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