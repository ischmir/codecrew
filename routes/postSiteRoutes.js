const loginC = require('../controllers/loginController');
const settingC = require('../controllers/settingController');
const templateC = require('../controllers/templateController');
const stackC = require('../controllers/dashboardController');
const teamController = require('../controllers/teamsController');

module.exports = function (app) {
	app.post('/login', loginC.postLogin, loginC.sendJWTtoUser);
	app.post('/settings-password', settingC.updatePassword);
	app.post('/upgradeUser', settingC.upgradeUser);
	app.post('/updateTemplate', templateC.updateTemplate);
	app.post('/templateCreation', templateC.templateCreation);
	app.post('/deleteTemplate', templateC.deleteTemplate);
	app.post('/createStack', stackC.createStack);
	app.post('/startStack', stackC.startStack);
	app.post('/stopStack', stackC.stopStack);
	app.post('/restartStack', stackC.restartStack);
	app.post('/createTeam', teamController.postNewTeam);
	app.post('/addTeamMember/:teamId', teamController.postAddTeamMember);
	app.post('/deleteStack/:portainerStackId', stackC.deleteStack)
};
