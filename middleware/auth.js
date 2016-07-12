var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = (req, res, next) => {
  if(isPreFlight(req) || isLogginInOrSigningUp(req)){ next(); return; }
  const token = req.headers.autherization;
  if (token) {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
      if(!decodedPayload) {
        // token verification failed
        res.status(401).json({ message: 'Authentication required.'});
        return;
      }

        // find the user
        User
          .findOne({ _id: decodedPayload._id })
          .then(
            user => {
              if(user) {
                // add the user to the request
                req.user = user;
                next();
              }
              else {
                // user not found
                res.status(401).json({ message: 'Authentication required.'});
              }
            }
        );
    })
    next();
    // Get the user
  }
  else {
    res.status(401).json({ message: 'Authentication required.'});
  }
};

function isLogginInOrSigningUp(req) {
  if (req.method.toLowerCase() !== 'post') { return false; }
  const loggingIn = req.originalUrl.includes('sessions');
  const signingUp = req.originalUrl.includes('users');
  return (loggingIn || signingUp);
}

function isPreFlight(req) {
  return (req.method.toLowerCase() === 'options');
}
