const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const logger = require('morgan');

// const path = require('path');
// const session = require('express-session');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use('/', routes);
// app.use(logger('dev'));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.listen(PORT, () =>
  console.log(`Listening: http://localhost:${PORT}`)
);
