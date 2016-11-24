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

// ************************* TEST CONNECTION WITH MONGODB SERVER *********************************
// you should have the mongodb server running in your terminal using the command `mongod`
// If everything is working correctly you should see 'Can you dig it?' logged in the terminal

var User = mongoose.model('User', { name: String });

var user = new User({ name: 'Art' });
user.save(function (err) {
  if (err) console.log(err);
  else console.log('Can you dig it?');
});

// ************************* DELETE AFTER SUCCESSFUL TEST *********************************

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
