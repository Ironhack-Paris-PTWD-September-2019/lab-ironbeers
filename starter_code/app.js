
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers() // calls the API to get 25 beers
  .then(beers => { // if results, call beers in beers views
    res.render('beers', {
      beers
    });
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/randon-beer', (req, res, next) => {
  punkAPI.getRandom() // calls the API to get 25 beers
  .then(beers => { // if results, call beers in beers views
    console.log(beers)
    res.render('randomBeer', {
      beers
    });
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);
