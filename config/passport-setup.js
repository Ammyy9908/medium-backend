const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();
const TwitterStrategy = require("passport-twitter").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://medium-backend-native.herokuapp.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // create a new user
      // but first find a user with google id

      const user = await User.findOne({ social_id: profile.id });
      if (user) {
        return cb(null, user);
      } else {
        new User({
          social_id: profile.id,
          username: profile.displayName,
        })
          .save()
          .then(() => {
            return cb(null, new_user);
          });
      }
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL:
        "https://medium-backend-native.herokuapp.com/auth/twitter/callback",
    },
    async function (token, tokenSecret, profile, cb) {
      const user = await User.findOne({ social_id: profile.id });
      if (user) {
        return cb(null, user);
      } else {
        new User({
          social_id: profile.id,
          username: profile.displayName,
        })
          .save()
          .then((new_user) => {
            return cb(null, new_user);
          });
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://medium-backend-native.herokuapp.com/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      const user = await User.findOne({ social_id: profile.id });
      if (user) {
        console.log("UserFound", user);
        return cb(null, user);
      } else {
        new User({
          social_id: profile.id,
          username: profile.displayName,
        })
          .save()
          .then((new_user) => {
            console.log(new_user);
            console.log("New User Created");
            return cb(null, new_user);
          });
      }
    }
  )
);
