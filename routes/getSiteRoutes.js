const dashboardC = require('../controllers/dashboardController');
const loginC = require('../controllers/loginController');
const settingsC = require('../controllers/settingController');
const teamsC = require('../controllers/teamsController');
const templateC = require('../controllers/templateController');

module.exports = function (app) {
	app.get('/', dashboardC.dashboardRedirect);
	app.get('/dashboard', dashboardC.dashboard);
	app.get('/login', loginC.login);
	app.get('/signup', loginC.signup);
	app.get('/logout', loginC.logout);
	app.get('/settings', settingsC.settings);
	app.get('/settings-password', settingsC.password);
	app.get('/admin_user_settings', settingsC.upgrade);
	app.get('/accessibility', settingsC.accessibility);
	app.get('/teams', teamsC.teams);
	app.get('/teams-edit', teamsC.teamsEdit);
	app.get('/teams-edit/:id', teamsC.teamsEdit);
	app.get('/forgot_password', loginC.forgot_password);
	app.get('/template', templateC.allTemplates);
	app.get('/create_template', templateC.createTemplate);
};
