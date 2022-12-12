var express = require('express');
const bodyParser = require("body-parser");
var path = require('path');
var logger = require('morgan');

var creditRoutes = require('./routes/credit');

var app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());


app.use('/v1/creditcards', creditRoutes);

module.exports = {app};