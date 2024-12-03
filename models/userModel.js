const db = require("../config/db");

exports.getAllUsersWithAllData = async function (){
    const [rows, fields] = await db.query(`
        SELECT
            Users.userId, 
            Roles.accessLevel, 
            Roles.roleName,
            Roles.stackLimit,
            Teams.teamName,
            userEmail, 
            username, 
            firstName, 
            lastName 
        FROM Users
        INNER JOIN Roles ON Users.FK_role = Roles.roleId
        INNER JOIN Composition_User_Team ON Users.UserId = Composition_User_Team.UserId
        INNER JOIN Teams ON Composition_User_Team.TeamId = Teams.TeamId
    `)

    return rows;
}
exports.getSingelUserByIdWithAllData = async function (userId) {
    const [rows, fields] = await db.query(`
            SELECT
            Users.userId, 
            Roles.accessLevel, 
            Roles.roleName,
            Roles.stackLimit,
            Teams.teamName,
            userEmail, 
            username, 
            firstName, 
            lastName 
        FROM Users
        INNER JOIN Roles ON Users.FK_role = Roles.roleId
        INNER JOIN Composition_User_Team ON Users.UserId = Composition_User_Team.UserId
        INNER JOIN Teams ON Composition_User_Team.TeamId = Teams.TeamId
        WHERE Users.UserId = ?
        `, 
        [userId])

    return rows;
}

exports.getSingelUserByEmailWithAllData = async function (userEmail) {
    const [rows, fields] = await db.query(`
            SELECT
            Users.userId, 
            Roles.accessLevel, 
            Roles.roleName,
            Roles.stackLimit,
            Teams.teamName,
            userEmail, 
            username, 
            firstName, 
            lastName 
        FROM Users
        INNER JOIN Roles ON Users.FK_role = Roles.roleId
        INNER JOIN Composition_User_Team ON Users.UserId = Composition_User_Team.UserId
        INNER JOIN Teams ON Composition_User_Team.TeamId = Teams.TeamId
        WHERE Credentials.Email = ?
        `, 
        [userEmail])
        
    return rows;
}

exports.saveJWTtoUser = async function (jwt, userId) {
    try {
        if(!userId) {
            throw new Error("The supplied userId, is undefined")
        }
        if(!jwt) {
            throw new Error("The supplied JWT, is not valid or is undefined")
        }

        const [verify] = await db.query(`SELECT optionsLastUpdate as lastUpdate FROM Users 
                                        INNER JOIN Options On Users.FK_options = Options.optionsId
                                        WHERE userId = ?`, [userId]);

        const verifyNow = Date.now();
        const lastUpdate = Date.parse(verify[0].lastUpdate)
        
        let seconds = Math.floor((verifyNow - (lastUpdate)) / 1000);
        let minutes = Math.floor(seconds/60);
        let hours = Math.floor(minutes/60);
        
        if(hours >= 8) { // if no JWT = INSERT; else UPDATe
            const [res] = await db.execute("INSERT INTO Options (optionsName, optionValue, optionsLastUpdate) VALUES (?, ?, ?)", ["JWT", jwt, new Date()])
            if(res.insertId) {
                const [affectedRows] = await db.execute("UPDATE Users SET FK_options = ? WHERE userId = ?", [res.insertId, userId])
                if(affectedRows < 1) {
                    throw new Error("Could not save the new jwt to the user.");
                }
            }
            else {
                throw new Error("There was an error with inserting the jwt to database.");
            }    
        }
    } 
    catch (error) {
        console.error(error);
    }
}
exports.getJWTfromUser = async function (userId) {
    try {
        if(!userId) {
            throw new Error("The supplied userId, is undefined")
        }
        const [rows] = await db.query(`SELECT optionValue as jwt FROM Users 
                                    INNER JOIN Options ON Users.FK_options = Options.optionsId
                                    WHERE userId = ?`, [userId]);
        
        return rows;
    } catch (error) {
        console.log(error);
        
    }   
}