const db = require('../config/db');
exports.teams = () => {
	const data = {
		title: 'Teams',
	};

	return data;
};
// team =
// name: 'Howdy Team',
// description: 'Yeeeehaw!!!!!        ',
// expire: '2024-12-28'
exports.addTeamToDB = async function (team) {
	await db.query('INSERT INTO Teams (teamName, teamCreationDate) VALUES (?, NOW());', [team.name]);
};
