const db = require("../config/db");

exports.getAllUsersWithAllData = async function (){
    const [rows, fields] = await db.query(`
        SELECT 
            Users.UserId, 
            Roles.Name AS RoleName, 
            Roles.StackLimit, 
            Teams.Name AS TeamName, 
            Teams.CreationDate, 
            Credentials.Email, 
            UserProfiles.Username, 
            UserProfiles.FirstName, 
            UserProfiles.LastName 
        FROM Users
        INNER JOIN Roles ON Users.FK_Role = Roles.RoleId
        INNER JOIN Composition_User_Team ON Users.UserId = Composition_User_Team.UserId
        INNER JOIN Teams ON Composition_User_Team.TeamId = Teams.TeamId
        INNER JOIN Credentials ON Users.FK_Credential = Credentials.Email
        INNER JOIN UserProfiles ON Users.FK_UserProfile = UserProfiles.Username;
    `)

    return rows;
}
exports.getSingelUserByIdWithAllData = async function (userId) {
    const [rows, fields] = await db.query(`
        SELECT 
            Users.UserId, 
            Roles.Name AS RoleName, 
            Roles.StackLimit, 
            Teams.Name AS TeamName, 
            Teams.CreationDate, 
            Credentials.Email, 
            UserProfiles.Username, 
            UserProfiles.FirstName, 
            UserProfiles.LastName 
        FROM Users
        INNER JOIN Roles ON Users.FK_Role = Roles.RoleId
        INNER JOIN Composition_User_Team ON Users.UserId = Composition_User_Team.UserId
        INNER JOIN Teams ON Composition_User_Team.TeamId = Teams.TeamId
        INNER JOIN Credentials ON Users.FK_Credential = Credentials.Email
        INNER JOIN UserProfiles ON Users.FK_UserProfile = UserProfiles.Username
        WHERE Users.UserId = ?
        `, 
        [userId])

    return rows;
}

exports.getSingelUserByEmailWithAllData = async function (userEmail) {
    const [rows, fields] = await db.query(`
        SELECT 
            Users.UserId, 
            Roles.Name AS RoleName, 
            Roles.StackLimit, 
            Teams.Name AS TeamName, 
            Teams.CreationDate, 
            Credentials.Email, 
            UserProfiles.Username, 
            UserProfiles.FirstName, 
            UserProfiles.LastName 
        FROM Users
        INNER JOIN Roles ON Users.FK_Role = Roles.RoleId
        INNER JOIN Composition_User_Team ON Users.UserId = Composition_User_Team.UserId
        INNER JOIN Teams ON Composition_User_Team.TeamId = Teams.TeamId
        INNER JOIN Credentials ON Users.FK_Credential = Credentials.Email
        INNER JOIN UserProfiles ON Users.FK_UserProfile = UserProfiles.Username
        WHERE Credentials.Email = ?
        `, 
        [userEmail])
        
    return rows;
}
