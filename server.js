const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
app.use(express.static("public"));

app.engine('hbs', exphbs.engine({ 
    defaultLayout: 'main',
    extname: '.hbs' 
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Example data
const data = {
    stackOne: [
        {name: "sandra-nginx"},
        {author: "codecrew"},
        {creationDate: "29.10.2024"},
        {status: 1}
    ],
    stackTwo: [
        {name: "sandra-nginx"},
        {author: "codecrew"},
        {creationDate: "29.10.2024"},
        {status: 1}
    ]
}

app.get('/', (req, res) => {
    res.render('projects', data);
});

app.get("/nav", (req, res) => {
    res.render("nav", {
        isAdmin: true
    })
});

app.get("/login", (req, res) => {
    res.render("index")
});

app.get("/signup", (req, res) => {
    res.render("signup")
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));