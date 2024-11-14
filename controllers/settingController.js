const userSettingsM = require('../models/userSettingModel');
const adminSettingsM = require('../models/adminSettingModel');

exports.settings = function (req, res) {
	res.render('settings', userSettingsM.userSettings());
};

exports.password = function (req, res) {
	const message = req.session.message;
	delete req.session.message;
	
	res.render('settings_password', userSettingsM.userSettingsPassword(message));
};

exports.upgrade = function (req, res) {
	res.render('admin_user_settings', adminSettingsM.adminSettingsUpgradeUser());
};

exports.updatePassword = function(req, res) {
	
	// check if password is correct
    if (req.body.curPassword == "1") {
        req.session.message = { type: "success", text: "Password changed successfully!" };
        res.redirect('/settings-password');
    } else {
        req.session.message = { type: 'danger', text: "Wrong current password." };
        res.redirect('/settings-password');
    }
}