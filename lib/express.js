'use strict';

var bodyParser = require('body-parser');
var consolidate = require('consolidate');
var cookieParser = require('cookie-parser');
var express = require('express');
var methodOverride = require('method-override');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');
var serveFavicon = require('serve-favicon');
var defaultPath = path.join(__dirname, '..', 'client', 'img', 'favicon', 'favicon.ico');

module.exports = function favicon(path, options){
  path = path || defaultPath;
  return serveFavicon(path, options);
};

var client = require(path.resolve('./lib/elasticsearch'));

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
  secret: 'keyboard cat fjdkslfjkdslvyuidogvhjkbvhdfkubvksbv',
}));

require(path.resolve('./lib/passport.js'))(app);

// Set Swig as the View Engine
app.engine('html', consolidate.swig);

// Set views path and view engine
app.set('view engine', 'html');
app.set('views', './');

require(path.resolve('./server/routes/posts.routes.server.js'))(app);
require(path.resolve('./server/routes/search.routes.server.js'))(app);
require(path.resolve('./server/routes/auth.routes.server.js'))(app);
require(path.resolve('./server/routes/comments.routes.server.js'))(app);
require(path.resolve('./server/routes/core.routes.server.js'))(app);

app.use(express.static(path.resolve('./client')));

module.exports = app;
