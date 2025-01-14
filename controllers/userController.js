const userM = require('../models/userModel');

exports.getAllUsers = async function (req, res) {
    res.render('admin_allUsers', await userM.getAllUsersWithAllData());
}
exports.upgradeUser = async function (req, res) {
    if(req.body.userId <= 0 || req.body.userRole == "") {
        res.redirect("admin_user_settings") // should be send with a error message. 
    }
    
    const affectedRows = await adminSettingsM.upgradeUser(req.body.userId, req.body.userRole);
    if(affectedRows < 1) {
        res.redirect("/admin_user_settings"); // if there wasn't any change in the db. mostly becourse there was no match, typo.
    }
    else {
        res.redirect("/admin_user_settings"); // on success, send a toast?
    }
}