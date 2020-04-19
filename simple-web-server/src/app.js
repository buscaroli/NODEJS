// Required Packages
const express = require('express');
const hbs = require('hbs');
const path = require('path');

// Path to used directories
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Calling the app
const app = express();

// Configuring handlebars (hbs)
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Configuring the app
app.use(express.static(publicPath));

// Setting routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author: 'Matteo'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        author: 'Matteo'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        author: 'Matteo',
        helpText: 'We are here to help you...'
    });
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny, 15C',
        location: 'Bournemouth, England'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Matteo',
        errorMsg: 'This help Page hasn\'t been found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Matteo',
        errorMsg: 'Page not found.'
    });
});

// Starting the server
app.listen(3000, () => {
    console.log('Server up on port 3000.')
});

