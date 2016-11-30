/* eslint no-console: 0 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const apiRouter = require('./apiRouter');

// DB setup
const DB_URI = require('./config').DB[process.env.NODE_ENV]
mongoose.connect(DB_URI, function (err) {
  if (err) console.log(err);
  else console.log(`Connected to DB: ${DB_URI}`);
});

// App middleware setup
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

// Router setup
app.use('/', apiRouter);

// Server setup
const PORT = process.env.PORT || 3090;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Listening on port ${PORT}`);
});
