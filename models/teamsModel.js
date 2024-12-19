const db = require('../config/db');

exports.teams = async function (teamId) {
	const [memberRows] = await db.query(
		`SELECT userId, firstName, lastName
		FROM Users`
	);

	const [teamRows] = await db.query(
		`SELECT teamId, teamName
		FROM Teams`
	);

	const [teamMemberRows] = await db.query(
		`SELECT userId, firstName, lastName
		FROM Users WHERE userId IN (SELECT UserId FROM Composition_User_Team WHERE TeamId = ?)`,
		[teamId]
	);

	return {
		title: 'Teams',
		members: memberRows,
		teams: teamRows,
		teamId: teamId,
		teamMembers: teamMemberRows,
	};
};

exports.addTeamToDB = async function (team) {
	const [response] = await db.query(
		`INSERT INTO Teams (teamName, teamCreationDate, teamDescription, teamExpireDate) 
		VALUES 
		(?, NOW(),?,?);`,
		[team.name, team.description, team.expire]
	);

	return response.insertId;
};
//Funktion til at indsætte medlem til et team med userID og TeamId
exports.addMemberToTeam = async function (memberId, teamId) {
	await db.query(
		`INSERT INTO Composition_User_Team (UserId, TeamId)
		VALUES
		(?,?);`,
		[memberId, teamId]
	);
};
