const teamsM = require('../models/teamsModel');

exports.teams = function (req, res) {
	res.render('teams', teamsM.teams());
};
