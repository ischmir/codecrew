const loginM = require('../models/loginModel');

exports.login = function (req, res) {
	res.render('login');
};
exports.postLogin = async function (req, res) {
	try {
		const { email, password } = req.body;

		const result = await loginM.getSingelUserForLogin(email, password);
		if (result[0] !== undefined) {
			const finalResult = result[0];
			const userData = {
				userRole: finalResult.RoleName,
				email: finalResult.Email,
				firstName: finalResult.FirstName,
				lastName: finalResult.LastName,
			};

			res.locals.userDetails = userData; // dosn't work yet. but it does store. untill a redirect happens... but it dosn't break anything :)
			console.log(res.locals.userDetails);

			res.redirect('/dashboard');
		} else {
			console.log('wrong login credientals');
			res.redirect('/dashboard'); // should be "/login" and giving an error msg.
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
