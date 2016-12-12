// authentication library
const passport = require('passport');
const User = require('../models/User');
const {secret} = require('../config');

// Strategy constructor
const JwtStrategy = require('passport-jwt').Strategy;
// Utility function to extract JWT from request obj
const ExtractJwt = require('passport-jwt').ExtractJwt;

// passport-local strategy constructor
const LocalStrategy = require('passport-local');

// //////////////////////////////////////////////////////////////////////////////////
// //////////// JWT STRATEGY ////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////

// Setup options for JWT Strategy
const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  // payload contains the decoded JWT token from the request
  // done is a callback function to signify success or failure of the authentication process, very similar to Express' next()

  // Check if user ID in the payload exists in our database
  User.findById(payload.sub, function (err, user) {
    // if something goes wrong during searching for a user, call done with an error and no user (false)
    if (err) return done(err, false);
    // if we find a user, call done with no error and the user
    if (user) done(null, user);
    // if we don't find a user it's not an error, so we return no error and no user.
    else done(null, false);
  });
});

// //////////////////////////////////////////////////////////////////////////////////
// //////////// LOCAL STRATEGY //////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////

// const localOptions = {
//   usernameField: 'email'
// };

const localLogin = new LocalStrategy(function (username, password, done) {
  // verify username and password
  User.findOne({username}, function (err, user) {
    if (err) return done(err, false);
    
    if (!user) return done(null, false);

    // compare passwords
    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err);
      // if they don't, call done with false
      if(!isMatch) return done(null, false);
      // if they match, call done with user
      return done(null, user);
    });
  });
});

// Tell passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);
