
module.exports = (req, res, next) => {

  //Allows CORS
  res.header('Access-Control-Allow-Origin', '*');

  // Allow Content-Type header (for JSON payloads)
  // Allow Autherization header (for JSON Web Tokens)
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  //Allow more HTTP verbs
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');

  //Continue processing the request
  next();
};
