
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const randomBeer = punkAPI.getRandom()

//randomBeer.then(beer => {
  //alert(beer[0].name)
//})

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beersData => {
      console.log(beersData);
      res.render('beers', {
        beersData: beersData
      });
    })
    .catch(error => {
      console.log('oops');
      console.log(error)
    })
});


app.listen(3000);
