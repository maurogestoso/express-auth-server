const User = require('../models/User');

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
      return res.json({success: true});
    });
  });
};