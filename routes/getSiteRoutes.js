const dashboardC = require('../controllers/dashboardController');
const loginC = require('../controllers/loginController');
const settingsC = require('../controllers/settingController');

module.exports = function (app) {
	app.get('/dashboard', dashboardC.dashboard);
	app.get('/login', loginC.login);
	app.get('/signup', loginC.signup);
	app.get('/settings', settingsC.settings);

	// app.get("/UserSetting", settingsC.userSetting);
	// app.get("/AdminSetting", siteC.singleUser)
};
