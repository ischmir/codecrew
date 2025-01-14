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

exports.upgrade = async function (req, res) {
	res.render('admin_user_settings', await adminSettingsM.adminSettingsUpgradeUser());
};

exports.accessibility = async function (req, res) {
	res.render('accessibility', await userSettingsM.accessibility())
}
exports.createUsers = async function (req, res) {
	res.render('admin_createUser', userSettingsM.createUsers())
}


exports.updateStackLimit = async function (req, res) { // should be a different redirect URL
	if(req.body.newStackLimit < 0 || req.body.accessLevel == "") {
		res.redirect('/admin_user_settings') // should be send with a error message. but the frontend should also handle this case.
	}

	const affectedRows = await adminSettingsM.updateStackLimit(99, "admin"); // should come from the same, as the if statement checks.
	if (affectedRows < 1) {
		res.redirect("/admin_user_settings"); // if there wasn't any change in the db. mostly becourse there was no match, typo.
	}
	else {
		res.redirect("/admin_user_settings"); // on success, send a toast?
	}
}

exports.updatePassword = async function(req, res) {
	if(req.session.userDetails != undefined) {
		if (await userSettingsM.CheckIfPasswordMatch(req.body.curPassword, req.session.userDetails.email)) {
			req.session.message = { type: "success", text: "Psst! Password changed - don't tell anyone!" };
			res.redirect('/settings-password');
		} else {
			req.session.message = { type: 'danger', text: "Wrong current password." };
			res.redirect('/settings-password');
		}
	}
	else {
		req.session.message = { type: 'danger', text: "Not logged in" };
		res.redirect('/settings-password');
	}   
}
exports.bulkCreateUserFromCSV = async function (req, res) {
	const rows = req.body.csvContent.split("\n");
	rows.pop(); // last is empty
    const headers = rows[0].split(",");

    const users = [];
    for (let i = 1; i < rows.length; i++) {

        const values = rows[i].split(",");
		
        const obj = [];

        for (let j = 0; j < headers.length; j++) {

            const key = headers[j].trim();
            let value = values[j].trim();
			
			if(key == "FK_role") {
				value = Number.parseInt(value);
			}
			obj.push(value)
        }

        users.push(obj);
    }
	await adminSettingsM.bulkCreateUsersFromCSVToDB(users);
	
	console.log(users);
	res.redirect("/admin_createUsers")
}