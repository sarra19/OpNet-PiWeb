const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_SECRET_KEY,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'emails'] // Specify the fields you want to retrieve
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const existingUser = await User.findOne({ facebookId: profile.id });

          if (existingUser) {
            console.log('Facebook user already exists in DB..');
            return cb(null, existingUser);
          }

       

          const newUser = new User({
            facebookId: profile.id,
            firstname: profile.displayName,
            email: (profile.emails && profile.emails.length > 0) ? profile.emails[0].value : null,
            profileImage: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : null,
            provider: 'facebook'
          });

          await newUser.save();
          console.log('New Facebook user added to DB..');
          return cb(null, newUser);
        } catch (error) {
          console.error('Error in Facebook authentication:', error);
          return cb(error);
        }
      }
    )
  );
};
