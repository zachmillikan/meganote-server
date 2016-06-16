require('dotenv').load();
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.json([
    {
      title: 'My hardcoded note.',
      body_html: 'wow'
    },
    {
      title: 'Another hardcoded note.',
      body_html: 'Such JSON.'
    }
  ]);
});

app.listen(3030, function() {
  console.log('DB: ' + process.env.DB_URI);
  console.log('Listening on http://localhost:3030...');
});
