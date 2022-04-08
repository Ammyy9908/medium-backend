const router = require("express").Router();
const passport = require("passport");
const verifyUser = require("../utils/verifyUser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
dotenv.config();
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res) => {
  res.send("Logged out...");
});

router.get("/google/user", verifyUser, async (req, res) => {
  const { id } = req.user;

  const user = await User.findOne({ google_id: id });
  if (user) {
    res.status(200).send(user);
  }
});

router.get("/facebook/user", verifyUser, async (req, res) => {
  const { id } = req.user;

  const user = await User.findOne({ google_id: id });
  if (user) {
    res.status(200).send(user);
  }
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("google"),
  async (req, res) => {
    const token = await jwt.sign(
      { id: req.user.google_id },
      process.env.APP_SECRET
    );
    res.redirect("exp://192.168.1.2:19000?token=" + token + "&provider=google");
  }
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    const token = await jwt.sign(
      { id: req.user.google_id },
      process.env.APP_SECRET
    );
    res.redirect("exp://192.168.1.2:19000?token=" + token + "&provider=google");
  }
);

module.exports = router;
