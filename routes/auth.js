const router = require("express").Router();
const passport = require("passport");
const verifyUser = require("../utils/verifyUser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
dotenv.config();
router.get("/login", (req, res) => {
  res.send("You have to loginned");
});

router.get("/google/user", verifyUser, async (req, res) => {
  const { id } = req.user;
  console.log(req.user);

  const user = await User.findOne({ social_id: id });
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(400).send("User not found");
  }
});

router.post("/facebook/login", async (req, res) => {
  const { username, id } = req.body;
  const user = await User.findOne({ social_id: id });
  if (user) {
    const token = jwt.sign({ id }, process.env.APP_SECRET);
    res.status(200).send({ token, provider: "facebook" });
  } else {
    const newUser = new User({
      username,
      social_id: id,
    });
    newUser.save().then(() => {
      const token = jwt.sign({ id }, process.env.APP_SECRET);
      res.status(200).send({ token, provider: "facebook" });
    });
  }
});

router.get("/facebook/user", verifyUser, async (req, res) => {
  const { id } = req.user;

  const user = await User.findOne({ social_id: id });
  if (user) {
    res.status(200).send(user);
  }
});

router.get("/twitter/user", verifyUser, async (req, res) => {
  const { id } = req.user;

  const user = await User.findOne({ social_id: id });
  if (user) {
    res.status(200).send(user);
  }
});

router.get("/github/user", verifyUser, async (req, res) => {
  const { id } = req.user;

  const user = await User.findOne({ social_id: id });
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

router.get("/logout", (req, res, next) => {
  req.logOut();
  req.redirect("/");
});

router.get(
  "/google/callback",
  passport.authenticate("google"),
  async (req, res) => {
    const token = await jwt.sign(
      { id: req.user.social_id },
      process.env.APP_SECRET
    );
    res.redirect("exp://192.168.1.2:19000?token=" + token + "&provider=google");
  }
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter"),
  async function (req, res) {
    // Successful authentication, redirect home.

    const token = await jwt.sign(
      { id: req.user.social_id },
      process.env.APP_SECRET
    );
    res.redirect(
      "exp://192.168.1.2:19000?token=" + token + "&provider=twitter"
    );
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async function (req, res) {
    // Successful authentication, redirect home.
    const token = await jwt.sign(
      { id: req.user.social_id },
      process.env.APP_SECRET
    );
    res.redirect("exp://192.168.1.2:19000?token=" + token + "&provider=github");
  }
);

module.exports = router;
