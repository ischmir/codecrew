const loginC = require("../controllers/loginController");
const settingC = require("../controllers/settingController");

module.exports = function(app) {
    app.post("/login", loginC.postLogin);
    app.post("/settings-password", settingC.updatePassword);
    app.post("/upgradeUser", settingC.upgradeUser);
}