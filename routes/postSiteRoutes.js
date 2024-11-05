const loginC = require("../controllers/loginController")

module.exports = function(app) {
    app.post("/login", loginC.postLogin)
}