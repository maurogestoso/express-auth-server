const express = require('express');
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

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

apiRouter.post('/signup', Authentication.signup);

module.exports = apiRouter;