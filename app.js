var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var cities = require('./routes/cities');
app.use('/cities', cities);

module.exports = app;
