const CustomError = require("../Models/customError");
const { accessTokenSecret } = require("../config.json");
const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || localStorage.getItem("token");

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        res.statusCode = 401;
        return next(new CustomError(401, "Unaothorized"));
      }
      req.user = user;
      next();
    });
  } else {
    res.statusCode = 401;
    return next(new CustomError(401, "Unaothorized"));
  }
};

module.exports = authenticateJWT;
