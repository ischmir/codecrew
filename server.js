const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const fetchHeaderUserDetails = require('./models/headerModel');

const app = express();

// Middlewares
app.use(express.static('public'));
app.use(fetchHeaderUserDetails.userDetails);
app.use(bodyParser.urlencoded({ extended: false })); // HEEKING... den SKAL være før routes.. den irreterede mig lidt :D (bruger den til at få data fra forms)

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
