
/**
 * Getting data for header, that are reusable on all sites. it stores the data in res.locals as userDetails. 
 * Storing in res.locals, stores the data globally on the server, during a request. but a request is done when going to next site (res.redirect).
 * But req.session has a longer lifetime.
 */
exports.userDetails = (req, res, next) => {
    
    if (req.session && req.session.userDetails) {
        res.locals.userDetails = req.session.userDetails;
    } else {
        res.locals.userDetails = {
            firstName: "Timm",
            lastName: "Tihi",
            email: "tihi66699@edu.ucl.dk"
        };
    }
    
    next();
}