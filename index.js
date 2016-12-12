/* eslint no-console: 0 */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const apiRouter = require('./apiRouter');
const Authentication = require('./controllers/authentication');
require('./services/passport');

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

// Auth routes
const requireSignin = passport.authenticate('local', {session: false});
apiRouter.post('/signup', Authentication.signup);
apiRouter.post('/signin', requireSignin, Authentication.signin);

// Router setup
app.use('/api', apiRouter);

// Server setup
const PORT = process.env.PORT || 3090;
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log(`Listening on port ${PORT}`);
});
