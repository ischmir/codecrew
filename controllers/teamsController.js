const teamsM = require('../models/teamsModel');

exports.teams = function (req, res) {
	res.render('teams-create', teamsM.teams());
};

exports.teamsEdit = function (req, res) {
	res.render('teams-edit', teamsM.teams());
};
