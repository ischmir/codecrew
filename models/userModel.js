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
