const loginM = require('../models/loginModel');
const dashboardM  = require('../models/dashboardModel');
const userM = require('../models/userModel');

exports.login = function (req, res) {
	res.locals.loginErrorMsg = "";
	if(req.session && req.session.userDetails) {
		// res.redirect("/dashboard") // this if statement redirects, if we are allready logged in.
	}
	res.render('login');
};
async function isNewStackAllowed(accessLevel, userId) {
	const stackLimit = await dashboardM.stackLimitForUser(accessLevel);
	const amountOfStacksByUser = await dashboardM.amountOfStacksByUser(userId);

	if(stackLimit <= amountOfStacksByUser) {
		return false;
	}
	
	return true;
}

exports.postLogin = async function (req, res) {
	try {
		res.locals.loginErrorMsg = "";
		const { email, password } = req.body;

		const result = await loginM.getSingelUserForLogin(email, password);
		
		if (result[0] !== undefined) {
			const finalResult = result[0];
			const userData = {
				userId: finalResult.userId,
				accessLevel: finalResult.accessLevel,
				email: finalResult.userEmail,
				firstName: finalResult.firstName,
				lastName: finalResult.lastName,
				isAdmin: finalResult.accessLevel == "admin" || finalResult.accessLevel == "superAdmin" ? true : false,
				isNewStackAllowed: await isNewStackAllowed(finalResult.accessLevel, finalResult.userId) ? true : false
			};

			req.session.userDetails = userData;
			res.locals.loginErrorMsg = "Wrong creditials. Cant find a user with that email and password";
			req.session.jwt = await dashboardM.portainerSystemAuth();
			req.session.save(); // to save it immediatly. if not, we would have to refresh the first site we use after login. which is dashboard.

			await userM.saveJWTtoUser(req.session.jwt, finalResult.userId);

			res.redirect('/dashboard');
		} else {
			res.locals.loginErrorMsg = "Wrong creditials. Cant find a user with that email and password";
			console.log('wrong login credientals');
			res.render('login');
		}
	} catch (error) {
		console.log('An error has occured');
		console.log(error);

		res.send('An internal error has occured\n\n' + error);
	}
};

exports.sendJWTtoUser = async function () {
	return dashboardM.portainerSystemAuth();
}

exports.signup = function (req, res) {
	res.render('signup');
};

exports.forgot_password = function (req, res) {
	res.render('forgot_password');
};
exports.logout = function(req, res) {
	req.session.destroy();

	res.redirect("login");
}