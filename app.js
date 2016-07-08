require('dotenv').load();
var express = require('express');
var bodyParser = require('body-parser');
var noteRoutes = require('./routes/note-routes');

var app = express();

app.use(function(req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', "POST, GET, DELETE, PUT");
  res.header('Access-Control-Allow-Headers',
    'Content-Type');
  //Allow more HTTP verbs
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');

  //Continue processing the request
  next();
});

app.use(bodyParser.json());

//Routes
app.use('/api/v1/notes', noteRoutes));

//Create a user
app.post('/users', function(req, res) {
  res.json({
    msg: 'Hooray!'
  });
});

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
