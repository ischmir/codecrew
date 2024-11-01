const db = require("../config/db");
const headerM = require("../models/headerModel")

exports.getSingelUserByEmail = function(userEmail, userPassword) {
    const [rows, fields] = db.query(`
        SELECT 
            Users.UserId, 
            Roles.Name AS RoleName, 
            Credentials.Email, 
            UserProfiles.Username, 
            UserProfiles.FirstName, 
            UserProfiles.LastName 
        FROM Users
        INNER JOIN Roles ON Users.FK_Role = Roles.RoleId
        INNER JOIN Composition_User_Team ON Users.UserId = Composition_User_Team.UserId
        INNER JOIN Credentials ON Users.FK_Credential = Credentials.Email
        INNER JOIN UserProfiles ON Users.FK_UserProfile = UserProfiles.Username
        WHERE Credentials.Email = ? AND Credentials.Password = ?
        `, 
        [userEmail, userPassword])

        
    return rows;
}