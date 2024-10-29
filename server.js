const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
app.use(express.static("public"));

app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", async (req, res) => {
    try {
        console.log("don't give up...");
        res.render("projects");
    } catch (err) {
        console.error("Rendering error:", err);
        res.status(500).send("Error rendering page");
    }
});

app.get("/nav", (req, res) => {
    res.render("index", {
        isAdmin: true
    })
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));