const Book = require("../Models/book");
const CustomError = require("../Models/customError");

const getBooks = async (req, res) => {
  const allBooks = await Book.find({}).catch((err) => {
    throw next(new CustomError(500, "Internal server erro"));
  });
  res.send(allBooks);
};

const addBook = async (req, res, next) => {
  if (req.user.role !== "Admin") {
    res.statusCode = 401;
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

const editBook = async (req, res, next) => {
  if (req.user.role !== "Admin") {
    res.statusCode = 401;
    return next(new CustomError(401, "Unauthorized to add a book"));
  }
  if (!req.body)
    return next(new CustomError(400, "Please insert book data to be updated"));
  const { id, title, author, price, description } = req.body;
  const book = await Book.findOne({ _id: id }).catch((err) => {
    throw next(new CustomError(404, "Book not found"));
  });
  if (!book) {
    res.statusCode = 404;
    return next(new CustomError(404, "Book not found"));
  }
  if (title) book.title = title;
  if (author) book.author = author;
  if (price) book.price = price;
  if (description) book.description = description;
  book.save().catch((err) => {
    throw next(new CustomError(500, "Internal Server error"));
  });
  res.send(book);
};

const removeBook = async (req, res, next) => {
  if (req.user.role !== "Admin") {
    res.statusCode = 401;
    return next(new CustomError(401, "Unauthorized to add a book"));
  }
  if (!req.body) return next(new CustomError(400, "Please send book id"));
  await Book.remove({ _id: req.body.bookId }).catch((err) =>
    res.send("Book Not Found")
  );
  res.send("Done");
};

module.exports = {
  getBooks,
  addBook,
  editBook,
  removeBook,
};
