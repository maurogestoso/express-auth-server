const User = require('../models/User');
const jwt = require('jwt-simple');
const {secret} = require('../config');

function tokenForUser (user) {
  const timestamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timestamp
  }, secret);
}

exports.signup = function (req, res, next) {
  const {username, name, password} = req.body;
  // validation
  if (!username || !password || !name) {
    return res.status(422).send({
      error: 'You must provide username, name and password'
    });
  }
  // check if a user was passed
  User.findOne({username}, (err, existingUser) => {
    if (err) return next(err);
    
    // check if user exists
    if (existingUser) {
      // if exists, respond with an error
      // 422 = unprocessable entity
      return res.status(422).send({error: 'Username is in use'});
    }
    // if doesn't exist, create, save and respond OK
    const user = new User({username, name, password});
    const {avatar_url} = user;  
    user.save((err) => {
      if (err) return next(err);
      return res.json({
        token: tokenForUser(user),
        user: {username, name, avatar_url}
      });
    });
  });
};

exports.signin = function (req, res, next) {
  // User has already been authenticated
  // Passport puts the user under the request object. NICE!
  // Send JWT and user info
  const {username, name, avatar_url} = req.user;
  res.send({
    token: tokenForUser(req.user),
    user: {username, name, avatar_url}
  });
}