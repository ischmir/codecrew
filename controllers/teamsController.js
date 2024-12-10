const teamsModel = require('../models/teamsModel');

exports.teams = function (requst, respons) {
	respons.render('teams-create', teamsModel.teams());
};

exports.teamsEdit = function (requst, respons) {
	respons.render('teams-edit', teamsModel.teams());
};
// Request.body =
// name: 'Howdy Team',
// description: 'Yeeeehaw!!!!!        ',
// expire: '2024-12-28'
exports.postNewTeam = async function (requst, respons) {
	//Lav tjek om man har adgang til at oprette team
	// Gemme daten i databasen
	await teamsModel.addTeamToDB(requst.body);
	console.log(teamsModel);
	// Redirect til Edit exsisting team
	respons.redirect('/teams-edit');
	// console.log(requst.body);
};
