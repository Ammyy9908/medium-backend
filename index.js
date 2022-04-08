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

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
    resave: false,
    saveUninitialized: true,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/logout", (req, res) => {
  req.logout();
  req.session = null;
  res.redirect("exp://192.168.1.2:19000?logout=success");
});

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
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("app now listening for requests on port " + PORT);
});
