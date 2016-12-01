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
  const {email, password} = req.body;
  // validation
  if (!email || !password) {
    return res.status(422).send({
      error: 'You must provide email and password'
    });
  }
  // check if a user was passed
  User.findOne({email}, (err, existingUser) => {
    if (err) return next(err);
    
    // check if user exists
    if (existingUser) {
      // if exists, respond with an error
      // 422 = unprocessable entity
      return res.status(422).send({error: 'Email is in use'});
    }
    // if doesn't exist, create, save and respond OK
    const user = new User({email, password});
    user.save((err) => {
      if (err) return next(err);
      return res.json({token: tokenForUser(user)});
    });
  });
};

exports.signin = function (req, res, next) {
  // User has already been authenticated
  // Passport puts the user under the request object. NICE!
  // Send JWT
  res.send({
    token: tokenForUser(req.user)
  });
}