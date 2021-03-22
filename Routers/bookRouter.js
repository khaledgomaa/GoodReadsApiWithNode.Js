const express = require("express");
const {
  getBooks,
  addBook,
  editBook,
  removeBook,
} = require("../controllers/bookController");
const authenticateJWT = require("../middleware/jwtAuthentication");

const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.post("/add", authenticateJWT, addBook);
bookRouter.put("/edit", authenticateJWT, editBook);
bookRouter.delete("/delete", authenticateJWT, removeBook);

module.exports = bookRouter;
