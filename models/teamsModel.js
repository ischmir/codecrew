const db = require('../config/db');
// Håndterer database-operationer for teams
exports.teams = async function (teamId) {
	// Henter alle teams fra databasen
	const [memberRows] = await db.query(
		`SELECT userId, firstName, lastName
		FROM Users`
		// returnerer alle userId, firstName og lastName fra databasen
	);

	const [teamRows] = await db.query(
		`SELECT teamId, teamName
		FROM Teams`
		// returnerer alle teamID og teamName fra databasen
	);

	const [teamMemberRows] = await db.query(
		`SELECT userId, firstName, lastName
		FROM Users WHERE userId IN (SELECT UserId FROM Composition_User_Team WHERE TeamId = ?)`,
		[teamId]
		// returnerer alle userId, firstName og lastName fra et specifikt team
	);

	return {
		title: 'Teams',
		members: memberRows,
		teams: teamRows,
		teamId: teamId,
		teamMembers: teamMemberRows,
		// Returnerer et objekt med alle teams og medlemmer
	};
};

exports.addTeamToDB = async function (team) {
	// Tilføjer et team til databasen
	const [response] = await db.query(
		// Tilføjer et team til databasen
		`INSERT INTO Teams (teamName, teamCreationDate, teamDescription, teamExpireDate) 
		VALUES 
		(?, NOW(),?,?);`,
		[team.name, team.description, team.expire]
		// Indsætter teamets navn, beskrivelse og udløbsdato i databasen. Teamets oprettelsesdato sættes automatisk til dags dato via NOW()
	);

	return response.insertId;
	// Returnerer id'et på det team, som vi har tilføjet til databasen
};

exports.addMemberToTeam = async function (memberId, teamId) {
	await db.query(
		//indsætter en række i Composition_User_Team tabellen
		`INSERT INTO Composition_User_Team (UserId, TeamId)
		VALUES
		(?,?);`,
		[memberId, teamId]
		// Indsætter memberId og teamId i Composition_User_Team tabellen
	);
};
