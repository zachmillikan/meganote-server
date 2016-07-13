var bcrypt = require('bcryptjs');
var db = require('../config/db');
var noteSchema = require('./note-schema');

var userSchema = db.Schema({
  name:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  passwordDigest: {
    type: String,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  notes: [noteSchema],
});

userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

userSchema.methods.toJSON = function () {
  var user = this.toObject();
  delete user.passwordDigest;
  delete user.__v;
  return user;
};

userSchema.methods.authenticate = function (password, callback) {
  bcrypt.compare(password, this.passwordDigest, (err, isMatch) => {
      callback(isMatch);
  });
};

module.exports = userSchema;
