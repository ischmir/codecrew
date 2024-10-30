const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
app.use(express.static('public'));

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

//Example data
const data = {
	stack: [
		{ id: (0)[({ name: 'sandra-nginx' }, { author: 'codecrew' }, { creationDate: '29.10.2024' }, { status: 1 })] },
		{ id: (1)[({ name: 'timm-nginx' }, { author: 'codecrew' }, { creationDate: '20.10.2024' }, { status: 1 })] },
	],
	title: 'Dashboard',
	isAdmin: true,
};

app.get('/dashboard', (req, res) => {
	res.render('dashboard', data);
});

app.get('/nav', (req, res) => {
	res.render('nav', {
		isAdmin: true,
	});
});

app.get('/login', (req, res) => {
	res.render('index');
});

app.get('/signup', (req, res) => {
	res.render('signup');
});

app.get('/settings', (req, res) => {
	res.render('settings');
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
