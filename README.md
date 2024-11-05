# Kubelab(Cutelab) Dashboard 

## Arbejds noter:
- Vi gør brug af MVC (Model, View, Controller) sturkturen.
- Vi kører en NodeJS-server.
- Vi bruger handlebars som view/template engine (HTML med dynamisk brug af JS, til at gøre livet lettere)
- Vi bruger github som vores kodebase/repository.
- Vi bruger MySQL som database.
- - Vi gør brug af docker til at hoste en lokal MySQL database, hvor vi laver et script til struktur og basisndhold, som bliver delt med gruppen.

## Forklaring af hvordan projektet fungere, med filerne, MVC osv.
- **server.js** Står for at kunne køre vores project som en **NodeJS** server via express. Her bliver der også lavet imports(require) og opsætning til handlebars og express.
- **routes mappen** Indeholder JavaScript-filer til at modtage endpoint-requests. For eksempel kræver ruten "/login" en route som "app.get("/login")" for at serveren kan modtage requestet og sende det videre til controlleren.
- **controllers mappen** indeholder JS filer til håndtering af hvilken **View** (handlebars) fil som skal vises. Controlleren sørger også for at sende den nødvendige data til View filen, såsom oplysninger om stacks, som hentes via **Model**. Controller er C i MVC.
- **models mappen** indeholder JS filer til indhentning af al data, såsom mockdata, api data, database data. Model er M i MVC. 
- **views mappen** indeholer alle vores handlebars filer, som er der hvor vi skriver html, samt handlebars måde at lave dynamisk data på via JS, hvor vi har dataen fra **controlleren** (som har fra **model**). **view mappen** har en bestemt struktur, med en **partials mappe** hvor der ligger genanvendelig kode til elementer så som: nav, header og footer, i form af handlebars filer. 
**views mappen** har også en **layouts mappe**, som er der hvor "main.hbs" lever. Den har til formål at altid blive indlæst på alle sider, hvor handlebars filerne som bare ligger i roden af **views mappen** (såsom dashboard.hbs, login.hbs) bliver lagt ind i. Hvilket er derfor vi ikke skriver den grundlæggende html start hver gang. Dette er noget som sker uden opsætning, hvis man følger handlebars standart måde at implementere det på. Som er det vi gør. 
**Views** er V i MVC.
  
``` html
<!-- DETTE ER main.hbs -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://unicons.iconscout.com/release-pro/v4.0.0/css/line.css">
    <link rel="stylesheet" href="css/style.css">
    <title>{{title}}</title>
</head>
<body>
    
    <div id="wrapper">
        {{{body}}}
    </div>

</body>
</html>
```
- **public mappen** Indeholder alle filer, som **views** filerne benytter, såsom css, client side(frontend) JS, billeder, osv. Når vi referere til de filer, så skal vi se public mappen som være roden. Det er en opsætning vi har lavet i **server.js** filen:
```js
const app = express();
app.use(express.static("public"));
```
- **package.json** indeholder informationer omkring vores projekt. Det er informatioer man kan bruge på bl.a github. Men for os er der 2 steder som er interessant: "scripts" og "dependencies". 
- - Scripts er hvor vi kan skrive en komando ved bare at kalde på et navn vi har givet den komando. Vi har skrevet 1 komando, som er til **NPM** (node package manager) pakken "nodemon", som gør, at vi ikke skal genstarte serveren manuelt efter hver ændring. For at køre den komando, skal vi skrive **"npm run dev"**
```json
"scripts": {
    "dev": "nodemon server.js",
    "test": "echo \"No tests in this example\""
  },
```

- - dependencies: Viser alle installerede pakker og deres versionsnumre, som er installeret i projektet.

```json
"dependencies": {
    "express": "^4.21.1",
    "express-handlebars": "^8.0.1",
    "hbs": "^4.2.0",
    "nodemon": "^3.1.7"
  }
```


## Systemets Flow
1. Projektet startes gennem **server.js** ved at skrive "npm run dev"
2. Vi skriver en url (localhost:3333), for at komme ind på en side. Lad os sige "dashboard", så "localhost:3333/dashboard.
3. **server.js** har en referece hen til **routes mappen** hvori der ligger en fil (getSiteRoutes.js) med en route til "/dashboard". 
```js
module.exports = function (app) {
    app.get("/dashboard", dashboardC.dashboard);
    app.get("/login", loginC.login);
    app.get("/signup", loginC.signup);
}
```
4. routen kalder så på **controlleren** som i det her tilfælde har variable navnet "dashboardC" og så på dens dashboard funktion.
```js
exports.dashboard = function (req, res) {  
    res.render('dashboard', dashboardM.mockData());
}
```
5. Her siger controlleren, at vi skal "render" altså vise "dashboard" handlebars filen. Den siger også at den skal sende data med, som kommer fra **models**. Som i det her tilfælde har variable navnet "dashboardM", hvori der så bliver kaldt på funktionen som hedder "mockData()"
```js
    exports.mockData = function() {
    // Corrected example data :)
    const data = {
        stack: [
            {
                id: 0,
                name: "sandra-nginx",
                author: "codecrew",
                creationDate: "29.10.2024",
                status: 1
            },
            {
                id: 1,
                name: "timm-nginx",
                author: "codecrew",
                creationDate: "20.10.2024",
                status: 1
            }
        ],
        title: "Dashboard",
        isAdmin: true
    };
    return data;
};
```
6. Hvis alt fungerer korrekt, vil controlleren sende **view** filen med data fra model som response, og siden bliver indlæst og alle er glade :D
   
## Arbejdes noter:
- Der er forksel på js, nu når vi sidder med NodeJS server. Der er server site JS og der er client side JS. Man kan se client side JS som være frontend JS, der hvor vi manipulere DOM. Server side er der hvor vi laver server opsætning (express), routes, generalt det vi laver i MVC strukruren. Server side er efterhånden der vi er mest nu.