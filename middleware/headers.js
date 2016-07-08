
module.exports = function (req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Methods', "POST, GET, DELETE, PUT");
  res.header('Access-Control-Allow-Headers',
    'Content-Type');
  //Allow more HTTP verbs
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');

  //Continue processing the request
  next();
});
