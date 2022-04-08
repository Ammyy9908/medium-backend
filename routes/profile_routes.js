const router = require("express").Router();
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.send("You have to login first");
  } else {
    next();
  }
};

router.get("/", authCheck, (req, res) => {
  res.send("You are logged in" + req.user);
});

module.exports = router;
