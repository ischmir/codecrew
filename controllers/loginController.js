const loginM = require('../models/loginModel');

exports.login = function (req, res) {
	res.locals.loginErrorMsg = "";
	res.render('login');
};
exports.postLogin = async function (req, res) {
	try {
		res.locals.loginErrorMsg = "";
		const { email, password } = req.body;

		const result = await loginM.getSingelUserForLogin(email, password);
		
		if (result[0] !== undefined) {
			const finalResult = result[0];
			console.log(finalResult);
			
			const userData = {
				email: finalResult.userEmail,
				firstName: finalResult.firstName,
				lastName: finalResult.lastName
			};

			req.session.userDetails = userData;
			
			res.locals.loginErrorMsg = "Wrong creditials. Cant find a user with that email and password";

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

exports.signup = function (req, res) {
	res.render('signup');
};

exports.forgot_password = function (req, res) {
	res.render('forgot_password');
};
