const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, max: 100 },
  author: { type: String, required: true, max: 50 },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  rate: { type: Number, required: false },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
