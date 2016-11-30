const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
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

module.exports = mongoose.model('user', userSchema);
