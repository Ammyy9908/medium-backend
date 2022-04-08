const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const verifyUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  try {
    const valid = await jwt.verify(token, process.env.APP_SECRET);
    if (!valid) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }
    req.user = valid;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }
};

module.exports = verifyUser;
