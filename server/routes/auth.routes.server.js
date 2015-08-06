'use strict';

var express = require('express');
var app = express();
var path = require('path');
// app.use(express.static(path.resolve('./client'))); //#authentification
app.set('views', __dirname + './client');

var passport = require('passport');
// var users = require('../controllers/users.server.controller.js');
// var auth = require('../config/auth.js');



app.use(passport.initialize());
app.use(passport.session());

module.exports = function(app) {
  app.get('/landing', function(req, res){
    console.log("inside /landing");
    res.render('landing', { user: req.user });
  });

  // app.get('/account', ensureAuthenticated, function(req, res){
  //   res.render('account', { user: req.user });
  // });
  app.get('/login', function(req, res){
    console.log("/authenticated and redirected to /login")
    res.render('loggedin', { user: req.user });
  });

  // GET /auth/github
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in GitHub authentication will involve redirecting
  //   the user to github.com.  After authorization, GitHubwill redirect the user
  //   back to this application at /auth/github/callback
  app.get('/auth/github',
    passport.authenticate('github'),
    function(req, res){
      console.log("check if this passport.authenticate is called");
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });

  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/github/callback', 
    passport.authenticate('github', { successRedirect: '/login', failureRedirect: '/landing' }),
    function(req, res) {
      console.log("check if callback is called");

      // res.redirect('/landing');
    });

  // app.get('/logout', function(req, res){
  //   req.logout();
  //   res.redirect('/landing');
  // });


  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      console.log()
      return next(); 
    }
    res.redirect('/login')
  } // ensureAuthenticated Fn

}; //module.exports app
