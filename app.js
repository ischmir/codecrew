const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const port = 4000;

// Set up Handlebars
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs');

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

const date = {
    stacks: [    
        {id: 1 [
            {name: "sandra-nginx"},
            {author: "codecrew"},
            {creationDate: "29.10.2024"},
            {status: 1}
        ]},
        {id: 2 [
            {name: "timm-nginx"},
            {author: "codecrew"},
            {creationDate: "28.10.2024"},
            {status: 0}
        ]}, 
    ]
};

// Defining a route to render a template
app.get('/', (req, res) => {
    res.render('projects', data);
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});