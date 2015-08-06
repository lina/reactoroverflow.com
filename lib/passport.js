'use strict';

var passport = require('passport');
var path = require('path');
var GitHubStrategy = require('passport-github').Strategy;

var config = require(path.resolve('./lib/config'));

module.exports = function(app) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  console.log("is clientID correct??????????",config.github.clientID);

  passport.use(new GitHubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: "http://127.0.0.1:4000/auth/github/callback" // TODO Make the route and controller
    },
    function(accessToken, refreshToken, profile, done) {
      console.log("user profile:",profile);
      console.log("accessToken:",accessToken);
      console.log("refreshToken:",refreshToken);

      // asynchronous verification, for effect...
      process.nextTick(function () {
         
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, false, { message: 'Incorrect password.' });
      }); // process.nextTick function
     } // anonymousfunction
  )); //passport.use

}; //module.exports


// return done(null, false, { message: 'Incorrect password.' });