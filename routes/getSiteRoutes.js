const dashboardC = require('../controllers/dashboardController');
const loginC = require('../controllers/loginController');
const settingsC = require('../controllers/settingController');

module.exports = function (app) {
	app.get("/", dashboardC.dashboard);
	app.get('/dashboard', dashboardC.dashboard);
	app.get('/login', loginC.login);
	app.get('/signup', loginC.signup);
	app.get('/settings', settingsC.settings);
	app.get('/settings-password', settingsC.password);
	app.get('/settings-upgrade-user', settingsC.upgrade);
	app.get('/forgot_password', loginC.forgot_password);


	// app.get("/UserSetting", settingsC.userSetting);
	// app.get("/AdminSetting", siteC.singleUser)
};
