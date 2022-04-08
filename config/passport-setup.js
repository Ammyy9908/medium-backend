const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const TwitterStrategy = require("passport-twitter").Strategy;

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
      clientID:
        "399035459742-k0e95cvo8comelv624s94v01231ja2qo.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL:
        "https://medium-backend-native.herokuapp.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // create a new user
      // but first find a user with google id
      console.log("Google User", profile);

      const user = await User.findOne({ social_id: profile.id });
      if (user) {
        console.log(user);
        return cb(null, user);
      } else {
        new User({
          social_id: profile.id,
          username: profile.displayName,
        })
          .save()
          .then(() => {
            console.log("New User Created");
            return cb(null, new_user);
          });
      }
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: "uw5PdJQFIuxA2lOFo1IBwevYi",
      consumerSecret: "mQst2qxX3E1cLY2ZlMLBXyhU95Q7hw3PbH6HM3DvefcrPd2xar",
      callbackURL:
        "https://medium-backend-native.herokuapp.com/auth/twitter/callback",
    },
    async function (token, tokenSecret, profile, cb) {
      console.log("Twitter User", profile);

      const user = await User.findOne({ social_id: profile.id });
      if (user) {
        console.log("UserFound", user);
        return cb(null, user);
      } else {
        new User({
          social_id: profile.id,
          username: profile.name,
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
