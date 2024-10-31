
/**
 * Getting data for header, that are reusable on all sites. it stores the data in res.locals as headerUserDetails. 
 * Storing in res.locals, stores the data globally on the server.
 */
exports.userDetails = (req, res, next) => {
    const data = {
        name: "Timm Tihi",
        email: "tihi66699@edu.ucl.dk"
    }
    res.locals.headerUserDetails = data;
    
    next();
}