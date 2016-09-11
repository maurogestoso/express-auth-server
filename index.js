const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const apiRouter = require('./apiRouter');

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
