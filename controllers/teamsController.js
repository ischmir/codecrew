const teamsModel = require('../models/teamsModel');
// Håndterer forespørgsler for teams

exports.teams = async function (requst, respons) {
	if (!requst.session.userDetails.isTeamAllowed) {
		respons.redirect('/dashboard');
		return;
	}
	// Henter alle teams fra databasen
	respons.render('teams-create', await teamsModel.teams());
	// Render teams-create-view med alle teams
};

exports.teamsEdit = async function (requst, respons) {
	if (!requst.session.userDetails.isTeamAllowed) {
		respons.redirect('/dashboard');
		return;
	}

	// Render teams-edit-view med et specifikt team
	respons.render('teams-edit', await teamsModel.teams(requst.params.id));
	// Render teams-edit-view med et specifikt team
};

exports.postNewTeam = async function (requst, respons) {
	if (!requst.session.userDetails.isTeamAllowed) {
		respons.redirect('/dashboard');
		return;
	}
	// Gemme daten i databasen
	const teamId = await teamsModel.addTeamToDB(requst.body);
	// Tilføjer et team til databasen
	respons.redirect('/teams-edit/' + teamId);
	// Redirect til Edit exsisting team
};
exports.postAddTeamMember = async function (requst, respons) {
	if (!requst.session.userDetails.isTeamAllowed) {
		respons.redirect('/dashboard');
		return;
	}

	// Gemme daten i databasen
	console.log('Tilføj member', requst.body.member);
	// Tilføjer et medlem til et team
	await teamsModel.addMemberToTeam(requst.body.member, requst.params.teamId);
	// Tilføjer et medlem til et team
	respons.redirect('/teams-edit/' + requst.params.teamId);
	// Redirect til Edit exsisting team
};
