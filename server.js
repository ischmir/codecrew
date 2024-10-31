const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fetchHeaderUserDetails = require("./models/headerModel");

const app = express();
app.use(express.static('public'));
app.use(fetchHeaderUserDetails.userDetails);
require('./routes/getSiteRoutes')(app); // routes


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
