/*jshint node: true */
'use strict';
/**
  import npm modules
*/
const passport = require('passport');
const basicStrategy = require('passport-http').BasicStrategy;

passport.use(new basicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
