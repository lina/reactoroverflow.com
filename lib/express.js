'use strict';

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var passport = require('passport'); //Item added for testing #authentification


var client = require(path.resolve('./lib/elasticsearch'));

var app = express();

app.use(morgan('dev'));

require(path.resolve('./lib/passport.js'))(app);

app.use(express.static(path.resolve('./../client'))); //#auhentification

require(path.resolve('./server/routes/auth.routes.server.js'))(app);
require(path.resolve('./server/routes/posts.routes.server.js'))(app);
require(path.resolve('./server/routes/core.routes.server.js'))(app);

module.exports = app;

// Items added for testing. #authentification
// This can be refactored into auth.controllers.server.js

// app.configure(function() {
  app.set('view engine', 'ejs');
  // app.set('view engine', 'html');
  // app.engine('html', ejs.renderFile);
  app.use(passport.initialize());
  app.use(passport.session());
// });
