const loginC = require("../controllers/loginController");
const settingC = require("../controllers/settingController");
const templateC = require("../controllers/templateController");

module.exports = function(app) {
    app.post("/login", loginC.postLogin);
    app.post("/settings-password", settingC.updatePassword);
    app.post("/upgradeUser", settingC.upgradeUser);
    app.post("/updateTemplate", templateC.updateTemplate);
    app.post("/templateCreation", templateC.templateCreation);
    app.post("/deleteTemplate", templateC.deleteTemplate);
}