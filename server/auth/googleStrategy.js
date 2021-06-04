const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');

// env configs
dotenv.config({ path: '__config__/config.env' });


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/google/callback'
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
