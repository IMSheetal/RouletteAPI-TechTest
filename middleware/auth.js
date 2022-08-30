const jwt = require("jsonwebtoken");
const User = require("../model/user");
const config = process.env;

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  const user = await User.findOne({ token });

  if (user) {
    try {
      jwt.verify(token, config.TOKEN_KEY, function (err, decoded) {
        if (err) {
          return res.status(401).send("Invalid Token");
        }
        req.user = decoded;
      });
      // console.log(req.user)
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  }else{
    return res.status(401).send("session end");
  }
};

module.exports = verifyToken;
