require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var Note = require('./models/note');

var app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', "POST, GET, DELETE, PUT");
  res.header('Access-Control-Allow-Headers', "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

app.get('/', function(req, res) {
  Note
    .find()
    .then(function(notes) {
      res.json(notes);
    });
});

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
