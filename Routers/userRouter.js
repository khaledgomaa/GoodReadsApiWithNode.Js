const express = require("express");
//const checkAuthentication = require("../middleware/checkAuthentication"); //using session
const authenticateJWT = require("../middleware/jwtAuthentication");
const {
  login,
  logout,
  register,
  getCurrentUser,
  addBookToFav,
  rateBookInFav,
} = require("../Controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", authenticateJWT, logout);
userRouter.post("/addBookToFav", authenticateJWT, addBookToFav);
userRouter.post("/rateBookInFav", authenticateJWT, rateBookInFav);
userRouter.get("/currentUser", authenticateJWT, getCurrentUser);

module.exports = userRouter;
