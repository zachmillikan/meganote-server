var db = require('mongoose');
db.connect(process.env.DB_URI);

modules.exports = db;
