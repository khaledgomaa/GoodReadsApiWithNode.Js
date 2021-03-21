const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: false, maxLength: 6 },
    booksFav: [
      {
        bookId: { type: mongoose.SchemaTypes.ObjectId, ref: "Book" },
        rate: { type: Number },
      },
    ],
  },
  {
    toJson: {
      transform: (doc, ret) => {
        delete ret.password;
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
