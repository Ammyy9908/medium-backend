const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

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
      callbackURL: "https://88eb-103-92-103-132.ngrok.io/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // create a new user
      // but first find a user with google id

      const user = await User.findOne({ google_id: profile.id });
      if (user) {
        console.log(user);
        return cb(null, user);
      } else {
        const new_user = await new User({
          google_id: profile.id,
          username: profile.displayName,
        }).save();
        return cb(null, new_user);
      }
    }
  )
);
