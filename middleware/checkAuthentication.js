const Token = require("../Models/token");
const User = require("../Models/user");

const checkAuthentication = (req, res, next) => {
  const curToken = req.cookies.serrionToken;
  if (!curToken) {
    res.statusCode = 401;
    res.send("Unauthorized");
    return;
  }

  Token.findOne({ _id: curToken }, (err, token) => {
    console.log(token);
    if (err || !token) {
      res.statusCode = 401;
      res.send("Unauthorized");
    } else {
      User.findOne({ _id: token.userId }, (err, user) => {
        req.user = user;
        console.log(user);
        next();
      });
    }
  });
};

module.exports = checkAuthentication;
