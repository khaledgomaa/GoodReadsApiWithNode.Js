const express = require("express");
const { getBooks, addBook } = require("../controllers/bookController");
const authenticateJWT = require("../middleware/jwtAuthentication");

const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.post("/add", authenticateJWT, addBook);

module.exports = bookRouter;
