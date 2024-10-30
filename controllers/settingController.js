exports.settings = function (req, res) {
	res.render('settings');
};

exports.password = function (req, res) {
	res.render('settings_password');
};

exports.upgrade = function (req, res) {
	res.render('settings_upgradeUser');
};
