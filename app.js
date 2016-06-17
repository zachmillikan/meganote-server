require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var Note = require('./models/note');
var bodyParser = require('body-parser');

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

app.get('/', function(req, res) {
  Note
    .find()
    .sort({ updated_at: 'desc'})
    .then(function(notes) {
      res.json(notes);
    });
});

//READ one note
app.get('/:id', function(req, res) {
  Note
    .findOne({
      _id: req.params.id
    })
    .then(function(note) {
      res.json(note);
    });
});

// CREATE a note
app.post('/', function(req, res) {
  var note = new Note({
    title: req.body.note.title,
    body_html: req.body.note.body_html
  });

  note
    .save()
    .then(function(noteData) {
      res.json({
        message: 'Successfully created note',
        note: noteData
      });
    });
});

//UPDATE a note
app.put('/:id', function(req, res) {
  Note
    .findOne({
      _id: req.params.id
    })
    .then(function(note) {
      note.title = req.body.note.title;
      note.body_html = req.body.note.body_html;
      note
        .save()
        .then(function() {
          res.json({
              message: 'Your changes have been saved.',
              note: note
            });
        });
    });
});

app.listen(3030, function() {
  console.log('Listening on http://localhost:3030...');
});
