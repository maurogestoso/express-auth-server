const express = require('express');

const apiRouter = express.Router();

apiRouter.get('/', function (req, res, next) {
  res.send([
    'Jennifern',
    'Game of Prawns mug',
    'headphones',
    'bike helmet'
  ]);
});

module.exports = apiRouter;