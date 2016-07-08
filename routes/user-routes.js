var router = require('express').Router();
var User = require('../models/user');

//Create a user
app.post('/', function(req, res) {
  var user = new User({
    name: req.body.user.name,
    username: req.body.user.username,
  });

  user
    .save()
    .then(
      userData => res.json(noteData)
    );
});

module.exports = router;
