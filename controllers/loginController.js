const loginM = require('../models/loginModel');
const dashboardM = require('../models/dashboardModel');
const userM = require('../models/userModel');

exports.login = function (req, res) {
  res.locals.loginErrorMsg = '';
  if (req.session && req.session.userDetails) {
    // res.redirect("/dashboard") // this if statement redirects, if we are allready logged in.
  }
  res.render('login');
};
async function isNewStackAllowed(accessLevel, userId) {
  const stackLimit = await dashboardM.stackLimitForUser(accessLevel);
  const amountOfStacksByUser = await dashboardM.amountOfStacksByUser(userId);

  if (stackLimit <= amountOfStacksByUser) {
    return false;
  }

  return true;
}

async function getUserPermissions(accessLevel, userId) {
  //returnerer et objekt med brugerens tilladelser baseret på deres accessLevel og userId.
  const permissions = {
    isNewStackAllowed: await isNewStackAllowed(accessLevel, userId),
    isTeamAllowed: accessLevel === 'admin' || accessLevel === 'superAdmin',
    isTemplateAllowed: accessLevel === 'superAdmin',
    isAdmin: accessLevel === 'admin' || accessLevel === 'superAdmin',
  };
  return permissions;
}

exports.postLogin = async function (req, res) {
  try {
    res.locals.loginErrorMsg = '';
    const { email, password } = req.body;
    //denne funktion bruges til at hente brugerens login informationer fra databasen.

    const result = await loginM.getSingelUserForLogin(email, password);

    if (result[0] !== undefined) {
      const finalResult = result[0];
      const permissions = await getUserPermissions(finalResult.accessLevel, finalResult.userId);
      // Henter brugerens tilladelser baseret på deres adgangsniveau og ID
      const userData = {
        userId: finalResult.userId,
        accessLevel: finalResult.accessLevel,
        email: finalResult.userEmail,
        firstName: finalResult.firstName,
        lastName: finalResult.lastName,
        ...permissions,
        // Tilføjer alle tilladelser fra getUserPermissions objektet til userData objektet
      };

      req.session.userDetails = userData;
      // Gemmer brugerens login informationer i sessionen
      res.locals.loginErrorMsg = 'Wrong creditials. Cant find a user with that email and password';
      // Sætter en fejlmeddelelse til brugeren, hvis der ikke blev fundet en bruger med de angivne loginoplysninger.
      req.session.jwt = await dashboardM.portainerSystemAuth();
      // Gemmer JWT til brugeren i databasen
      await userM.saveJWTtoUser(req.session.jwt, finalResult.userId);
      // Gemmer JWT til brugeren i databasen
      req.session.save(err => {
        if (err) {
          console.error('Session save error:', err);
          return res.redirect('/login'); //hvis der sker en fejl, redirectes brugeren til login siden.
        }
        res.redirect('/dashboard'); //hvis der IKK sker en fejl, redirectes brugeren til dashboard siden.
      });
    } else {
      res.locals.loginErrorMsg = 'Wrong creditials. Cant find a user with that email and password';
      //fejlmeddelelse til brugeren, hvis der ikk blev fundet en bruger med de loginoplysninger.
      console.log('wrong login credientals');
      res.render('login');
      //
    }
  } catch (error) {
    //catch bruges til at fange fejl
    console.log('An error has occured');
    console.log(error);

    res.send('An internal error has occured\n\n' + error);
    //fejlmeddelelse til brugeren, hvis der sker en fejl.
  }
};

exports.sendJWTtoUser = async function () {
  return dashboardM.portainerSystemAuth();
};

exports.signup = function (req, res) {
  res.render('signup');
};

exports.forgot_password = function (req, res) {
  res.render('forgot_password');
};
exports.logout = function (req, res) {
  req.session.destroy();

  res.redirect('login');
};
