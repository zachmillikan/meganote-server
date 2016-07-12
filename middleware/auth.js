var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if(isPreFlight(req) || isLogginInOrSigningUp(req)){ next(); return; }
  const token = req.headers.autherization;
  if (token) {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
      if(decodedPayload) {
        // get the user
        res.json ({
          decodedPayload
        });
      }
      else {
        // token verification failed
        res.status(401).json({ message: 'Authentication required.'});
      }
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
