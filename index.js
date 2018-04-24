const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.port || 3000;

const app = express();
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

//vistor log keeper
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}|${req.method}|${req.url}|${res.statusCode}`;
    fs.appendFileSync('visitor.log', log +'\n');
    next();
});

app.get('/post', (req, res) => {
    res.render('post.hbs', {
        pageTitle: "Blog Post"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About"
    });
});

app.get('/contact', (req, res) => {
    res.render('contact.hbs', {
        pageTitle: "Contact"
    });
});

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: "Home"
    });
});




//to handle page not found error (404)
app.get('*', (req, res) => {
    res.render('404.hbs');
});

app.listen(port, () => {
    console.log("Port number: "+port)
});