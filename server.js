const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);

const fetchHeaderUserDetails = require('./models/headerModel');

const app = express();

// we set up a connection to our DB, so the package can use it to store the session, automaticly.
// that way, we have a persistent session, since its stored in the db, instead of the browser.
// that is the reason, why we gets logged out, whenever we restart the server (such as saving a change).
const sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'KubelabDashboard',
	createDatabaseTable: true,
});

app.use(session({
    secret: 'NotKeyboardCat',
	store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set `secure: true` if using HTTPS
}));

// Middlewares
app.use(express.static('public'));
app.use(fetchHeaderUserDetails.userDetails);
app.use(bodyParser.urlencoded({ extended: false }));


app.all('*', loginRequired); // target ALLE routes/sider

function loginRequired(req, res, next) {

    const excludedPaths = ['/login', '/signup', '/forgot_password']; // sider man godt må komme på, hvis man ikke er logged ind
    if (excludedPaths.includes(req.path)) {
        return next();
    }
    
    // Check if the user is logged in
    if (!req.session.userDetails) {
        return res.redirect("/login");
    }

    return next();
};

require('./routes/getSiteRoutes')(app); // GET routes
require('./routes/postSiteRoutes')(app); // POST routes



app.engine(
	'hbs',
	exphbs.engine({
		defaultLayout: 'main',
		extname: '.hbs',
		partialsDir: path.join(__dirname, 'views/partials'),
	})
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
