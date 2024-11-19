const dashboardC = require('../controllers/dashboardController');
const loginC = require('../controllers/loginController');
const settingsC = require('../controllers/settingController');
const teamsC = require('../controllers/teamsController');

module.exports = function (app) {
	app.get('/', dashboardC.dashboardRedirect);
	app.get('/dashboard', dashboardC.dashboard);
	app.get('/login', loginC.login);
	app.get('/signup', loginC.signup);
	app.get('/logout', loginC.logout);
	app.get('/settings', settingsC.settings);
	app.get('/settings-password', settingsC.password);
	app.get('/admin_user_settings', settingsC.upgrade);
	app.get('/teams', teamsC.teams);
	app.get('/forgot_password', loginC.forgot_password);
};
