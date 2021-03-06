const express = require('express');
const hbs = require('hbs');      // hbs is an express.js view engine for handlebars.js
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
    return text.toUpperCase();
});

app.set('view engine','hbs');  // a ('key','value') pair

app.use( (request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    // fs.appendFile('server.log', log + '\n', (err) => {
    //     if(err) console.log('unable to update server.log');
    // });
    next();
});

/*
app.use( (request, response, next) => {
    response.render('maintenance.hbs');
});
*/

/* setting up middleware defines how express is going to work. we're passing a function, 'static', an express built in m/w. This gives us a static directory where we can do html, css and do a web page */
app.use(express.static(__dirname + '/public'));

 // handler for HTTP get request ..
app.get('/', (request, response) => {
    response.render('root.hbs', {
        welcome:'Hello People!',
        pageTitle:'Home Page'
//        currentYear: new Date().getFullYear()
    })
});

app.get('/about', (request, response) => {
//    response.send('About Page');
    response.render('about.hbs', {
        pageTitle:'About Page'
//        currentYear: new Date().getFullYear()
    });
});

app.get('/project', (request, response) => {
    response.render('project.hbs', {
        welcome:'Welcome to the projects page',
        pageTitle:'Projects Page'
    })
});

app.get('/phil', (request, response) => {
    response.send(
    {
        firstname:'Philip',
        surname:'Zelazowski',
        DOB:'03/06/1952',
        hobbies:['flying', 'gliding', 'driving']
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errormessage:'unable to handle request'
    });
});


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});  // binds the listener to developer's port 3000
