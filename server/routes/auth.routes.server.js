'use strict';

// Routes will go here.
'use strict';
  var passport = require('passport');
  var users = require('../controllers/users.server.controller.js');
  var auth = require('../config/auth.js');


  module.exports = function(app) {
    auth.githubStrategy();

    /* GET /auth/github
      Use passport.authenticate() as route middleware to authenticate the
      request.  The first step in GitHub authentication will involve redirecting
      the user to github.com.  After authorization, GitHubwill redirect the user
      back to this application at /auth/github/callback */

    app.get('/api/auth/github',
      passport.authenticate('github', { scope: [ 'user', 'public_repo' ] }));


    /* GET /auth/github/callback
      Use passport.authenticate() as route middleware to authenticate the
      request.  If authentication fails, the user will be redirected back to the
      login page.  Otherwise, the primary route function function will be called,
      which, in this example, will redirect the user to the home page. */
    app.get('/api/auth/github/callback',
      passport.authenticate('github', { failureRedirect: '/signup' }), users.githubRedirect);

    /* Passes encoded user id token to client if a session exists.  HTTP request is made to this url in the home page resolve if there is no jwtToken saved in localStorage.  This is a workaround for the difficulty we had passing authentication information to the client from the auth/github/callback */
    app.get('/api/auth/checkauth', users.checkAuth);

    /* Removes session data from server and passes back true if this is done successfully */
    app.get('/api/auth/logout', users.logout);

    /* Parameters: user_id
       Data returned: all user info [WILL BE UPDATED] */
    app.get('/api/user/info', users.userInfo);

    app.get('/api/user/profile', users.userInfoByUsername);

    /* Parameters: user_id (jwtToken), username
      Data returned: boolean matching username to the user found with jwtToken */
    app.get('/api/user/profile/owner', users.userProfileOwner);

    /* Parameters: user_id
      deletes user from DB */
    app.delete('/api/user/info', users.deleteUser);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

};