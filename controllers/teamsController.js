const teamsM = require('../models/teamsModel');

exports.teams = function (req, res) {
	res.render('teams-create', teamsM.teams());
};

exports.teamsEdit = function (req, res) {
	res.render('teams-edit', teamsM.teams());
};

exports.postNewTeam = async function (requst, respons) {
	//Lav tjek om man har adgang til at oprette team
	// Gemme daten i databasen
	// Redirect til Edit exsisting team
	console.log(requst.body);
};
