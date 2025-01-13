const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const MySQLStore = require('express-mysql-session')(session);
// Importerer de grundlæggende Node.js moduler og middleware som applikationen skal bruge

const fetchHeaderUserDetails = require('./models/headerModel');
// Henter data fra header

const app = express();
// Starter Express app

const sessionStore = new MySQLStore({
	host: 'localhost', // Database host
	port: 3306, // Standard MySQL port
	user: 'root', // Database bruger
	password: 'root', // Database kodeord
	database: 'KubelabDashboard', // Navnet på databasen
	createDatabaseTable: true, // Opretter automatisk sessions-tabel hvis den ikke findes
});

app.use(
	session({
		secret: 'NotKeyboardCat', // bruges til at kryptere session data
		store: sessionStore, // Bruger den MySQL session store vi oprettede ovenfor
		resave: false, //sessionen gemmes kun hvis der er ændringer
		saveUninitialized: false, //forhindrer tomme sessions i at blive gemt
		cookie: { secure: false }, // Er sat til false, da vi ikke bruger HTTPS
	})
);

app.use(express.static('public'));
// Gør 'public' mappen tilgængelig for statiske filer (CSS, JavaScript, billeder)

app.use(fetchHeaderUserDetails.userDetails);
// Tilføjer brugerdetaljer til response objektet for alle requests

app.use(bodyParser.urlencoded({ extended: false }));
// Parser form data fra requests

app.all('*', loginRequired);
// Anvender loginRequired middleware på alle routes

function loginRequired(req, res, next) {
	//  stier som ikke kræver login
	const excludedPaths = ['/login', '/signup', '/forgot_password'];
	if (excludedPaths.includes(req.path)) {
		return next();
	} // Hvis bruger ikke er logget ind, redirect til login
	if (!req.session.userDetails) {
		return res.redirect('/login');
	} // Bruger er logget ind, fortsæt til næste middleware
	return next();
}

require('./routes/getSiteRoutes')(app);
require('./routes/postSiteRoutes')(app);
// Indlæser route handlers fra separate filer for bedre organisering og vedligeholdelse

app.engine(
	'hbs',
	exphbs.engine({
		defaultLayout: 'main', // Sætter main.hbs som standard layout template
		extname: '.hbs', // Definerer .hbs som filendelsen for vores templates
		partialsDir: path.join(__dirname, 'views/partials'), // Angiver stien til vores partials (genbrugelige template-komponenter)
	})
);

app.set('view engine', 'hbs'); // Fortæller Express at bruge Handlebars som view engine
app.set('views', path.join(__dirname, 'views')); // Angiver stien til mappen med view filer

// Definerer port nummer fra environment variabel eller bruger 3333 som standard
const PORT = process.env.PORT || 3333;
// Starter Express serveren og logger en bekræftelse
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
