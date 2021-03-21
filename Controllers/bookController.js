const { json } = require("body-parser");
const Book = require("../Models/book");
const CustomError = require("../Models/customError");

const getBooks = async (req, res) => {
  const allBooks = await Book.find({}).catch((err) => {
    throw next(new CustomError(500, "Internal server erro"));
  });
  res.send(allBooks);
};

const addBook = async (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== "Admin") {
    return next(new CustomError(401, "Unauthorized to add a book"));
  }
  const { title, author, price, description } = req.body;
  const book = new Book({ title, author, price, description });
  if (!req.body) return next(new CustomError(400, "please insert a book data"));
  const newBook = await book.save().catch((err) => {
    throw next(new CustomError(500, "Internal server error"));
  });
  res.send(newBook);
};

module.exports = {
  getBooks,
  addBook,
};
