const express = require('express');
const passport = require('passport');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});

const apiRouter = express.Router();

apiRouter.get('/', requireAuth, function (req, res) {
  res.send([
    'Jennifern',
    'Game of Prawns mug',
    'headphones',
    'bike helmet'
  ]);
});

module.exports = apiRouter;