/**
 * Getting data for header, that are reusable on all sites. it stores the data in res.locals as userDetails.
 * Storing in res.locals, stores the data globally on the server, during a request. but a request is done when going to next site (res.redirect).
 * But req.session has a longer lifetime.
 */
exports.userDetails = (req, res, next) => {
  if (req.session && req.session.userDetails) {
    res.locals.userDetails = req.session.userDetails;
    //hvis brugeren har en session, og har brugerdetaljer, gemmer vi detaljer i res.locals.
  } else {
    res.locals.userDetails = {
      firstName: 'Timm',
      lastName: 'Tihi',
      email: 'tihi66699@edu.ucl.dk',
    };
    //hvis brugeren IKKE har en session, eller IKKE har en brugerdetaljer, så gemmer vi brugerdetaljer i res.locals.
  }

  next();
  //next() er en funktion, som kaldes, når vi har gemt brugerdetaljerne i res.locals.
};
