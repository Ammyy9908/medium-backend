const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile_routes");
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
const dotenv = require("dotenv");
const connect_db = require("./utils/db_connect");
dotenv.config();
const app = express();

// set view engine
app.set("view engine", "ejs");

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

connect_db()
  .then((connected) => {
    if (connected) {
      console.log("Connected to MongoDB");
    } else {
      console.log("Failed to connect to MongoDB");
    }
  })
  .catch((error) => {
    console.log(error);
  });

// set up routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(5000, () => {
  console.log("app now listening for requests on port 5000");
});
