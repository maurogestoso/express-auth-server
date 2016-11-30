const express = require('express');
const Authentication = require('./controllers/authentication');

const apiRouter = express.Router();

apiRouter.get('/', function (req, res, next) {
  res.send([
    'Jennifern',
    'Game of Prawns mug',
    'headphones',
    'bike helmet'
  ]);
});

apiRouter.post('/signup', Authentication.signup);

module.exports = apiRouter;