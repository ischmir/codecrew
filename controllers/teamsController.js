const teamsModel = require('../models/teamsModel');

exports.teams = async function (requst, respons) {
	respons.render('teams-create', await teamsModel.teams());
};

exports.teamsEdit = async function (requst, respons) {
	respons.render('teams-edit', await teamsModel.teams(requst.params.id));
};
// Request.body =
// name: 'Howdy Team',
// description: 'Yeeeehaw!!!!!        ',
// expire: '2024-12-28'
exports.postNewTeam = async function (requst, respons) {
	//Lav tjek om man har adgang til at oprette team
	// Gemme daten i databasen
	const teamId = await teamsModel.addTeamToDB(requst.body);
	// Redirect til Edit exsisting team
	respons.redirect('/teams-edit/' + teamId);
	// console.log(requst.body);
};
exports.postAddTeamMember = async function (requst, respons) {
	//Lav tjek om man har adgang til at oprette team
	// Gemme daten i databasen
	console.log('Tilføj member', requst.body.member);
	// await
	await teamsModel.addMemberToTeam(requst.body.member, requst.params.teamId);
	// Redirect til Edit exsisting team
	respons.redirect('/teams-edit/' + requst.params.teamId);
	// console.log(requst.body);
};
