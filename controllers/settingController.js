const userSettingsM = require('../models/userSettingModel');
const adminSettingsM = require('../models/adminSettingModel');

exports.settings = function (req, res) {
	res.render('settings', userSettingsM.userSettings());
};

exports.password = function (req, res) {
	res.render('settings_password', userSettingsM.userSettingsPassword());
};

exports.upgrade = function (req, res) {
	res.render('admin_user_settings', adminSettingsM.adminSettingsUpgradeUser());
};
