const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  avatar_url: {
    type: String,
    default: 'https://avatar3.githubusercontent.com/u/6791502?v=3&s=200'
  },
  password: String
});

// on save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function (next) {
  // the context of this function is an instance of the user model
  const user = this;
  // generate a salt, then run callback
  bcrypt.genSalt(10, function (err, salt) {
    if (err) { return next(err); }
    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) { return next(err); }
      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
}

module.exports = mongoose.model('user', userSchema);
