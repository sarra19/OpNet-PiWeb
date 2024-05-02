const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const User = require('../models/user');
const GitHubStrategy = require('passport-github2').Strategy;

const router = express.Router();
require('dotenv').config();
module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });
  
    passport.deserializeUser(function (id, done) {
      UserModel.findById(id, function (err, user) {
        done(err, user);
      });
    });
  
    passport.use(
        new GitHubStrategy(
          {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET_KEY,
            callbackURL: "http://localhost:5000/auth/github/callback",
        },
          async (accessToken, refreshToken, profile, cb) => {
            const user = await User.findOne({
              accountId: profile.id,
              provider: 'github',
            });
            if (!user) {
              console.log('Adding new github user to DB..');
              const user = new User({
                githubId: profile.id,
                firstname: profile.displayName,
                profileImage: profile.photos[0].value, 
                provider: profile.provider,
              });
              await user.save();
              // console.log(user);
              return cb(null, profile);
            } else {
              console.log('Github user already exist in DB..');
              // console.log(profile);
              return cb(null, profile);
            }
          }
        )
      );

    };