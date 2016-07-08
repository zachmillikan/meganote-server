var router = require('express').Router();

//Create a user
app.post('/', function(req, res) {
  res.json({
    msg: 'Hooray!'
  });
});

module.exports = router;
