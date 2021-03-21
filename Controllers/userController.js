const User = require("../Models/user");
const Book = require("../Models/book");
const CustomError = require("../Models/customError");
const Token = require("../Models/token");
const bycrypt = require("bcrypt");
const { accessTokenSecret } = require("../config.json");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");

const register = async (req, res, next) => {
  const userReq = req.body || {};
  //TODO : validate incoming data before querying database
  if (!userReq) return next(new CustomError(400, "insert data please"));

  const { email, userName, password, role } = userReq;

  const existUser = await User.findOne({ email }).catch((err) => {
    console.log(err);
    throw next(new CustomError(500, "internal server error"));
  });
  if (existUser) return next(new CustomError(400, "Email already exist"));
  const addeduser = new User({ email, userName });
  const salt = await bycrypt.genSalt(10).catch((err) => {
    console.log(err);
    throw next(new CustomError(500, "internal server error"));
  });
  const hash = await bycrypt.hash(password, salt).catch((err) => {
    console.log(err);
    throw next(new CustomError(500, "internal server error"));
  });
  addeduser.password = hash;
  const newUser = await addeduser.save().catch((err) => {
    console.log(err);
    throw next(new CustomError(500, "internal server error"));
  });
  if (!newUser) return;
  const accessToken = jwt.sign({ email, userName, role }, accessTokenSecret);
  localStorage.setItem("token", "Bearer " + accessToken);
  res.send(accessToken);
};

const login = async (req, res, next) => {
  if (!req.body) return next(new CustomError("please insert data"));
  const { email, password } = req.body;
  const user = await User.findOne({ email }).catch((err) => {
    throw next(new CustomError(500, "Internal server error"));
  });

  if (!user) return next(new CustomError(401, "Unauthorized"));
  const comparePass = await bycrypt
    .compare(password, user.password)
    .catch((err) => {
      throw next(new CustomError(500, "Internal server error"));
    });

  if (comparePass) {
    const accessToken = jwt.sign(
      { email, userName: user.userName, role: user.role },
      accessTokenSecret
    );

    localStorage.setItem("token", "Bearer " + accessToken);
    res.send(accessToken);
  } else {
    res.statusCode = 401;
    return next(new CustomError(401, "Unauthorized"));
  }
};

const logout = async (req, res, next) => {
  if (!req.user) return next(new CustomError(404, "no logged in user"));
  const { email } = req.user;
  await Token.remove({ email }).catch((err) => {
    throw next(new CustomError("internal server error"));
  });
  localStorage.removeItem("token");
  res.send("you signed out hope you come back");
};

const getCurrentUser = (req, res, next) => {
  res.send(req.user);
};

const addBookToFav = async (req, res, next) => {
  if (!req.body) return next(new CustomError(400, "please insert data"));
  const { bookId } = req.body;
  const selectedBook = Book.findOne({ bookId }).catch((err) => {
    throw next(new CustomError(500, "Internal Server Error"));
  });
  if (!selectedBook) return next(new CustomError(404, "Book not found"));
  const { email } = req.user;

  const currentUser = await User.findOne({ email }).catch((err) => {
    throw next(new CustomError(500, "Internal Server Error"));
  });
  if (currentUser) {
    const checkBookInFav =
      currentUser.booksFav.find((item) => item.bookId == bookId) || "NA";
    if (checkBookInFav != "NA")
      return next(new CustomError(400, "Book already into your favourite"));
  }

  currentUser.booksFav.push({ bookId });
  await currentUser.save().catch((err) => {
    console.log(err);
    throw next(new CustomError(500, "Internal Server Error"));
  });
  res.send("book added to your favourites");
};

const rateBookInFav = async (req, res, next) => {
  if (!req.body) return next(new CustomError(400, "Insert data please"));
  const { bookId, rate } = req.body;

  const { email } = req.user;
  const currentUser = await User.findOne({ email }).catch((err) => {
    throw next(new CustomError(500, "Internal Server Error"));
  });
  if (currentUser.booksFav.length === 0)
    return next(new CustomError(404, "No available books in your fav"));
  const checkBookExistInUserFav = currentUser.booksFav.find(
    (item) => item.bookId == bookId
  );
  if (!checkBookExistInUserFav)
    return next(new CustomError(404, "Sorry book not in your favs"));
  checkBookExistInUserFav.rate = rate;
  await currentUser.save().catch((err) => {
    throw next(new CustomError(500, "Internal Server Error"));
  });
  const avgRate = await getAvgRateByBookId(bookId).catch((err) => {
    console.log(err);
    throw next(new CustomError(500, "Internal Server Error"));
  });
  if (avgRate) {
    await updateBookRate(bookId, avgRate).catch((err) => {
      console.log(err);
      throw next(new CustomError(500, "Internal Server Error"));
    });
  }
  res.send(new CustomError(200, "rate done sucessfully"));
};

const getAvgRateByBookId = async (bookId) => {
  const usersRates = await User.aggregate([
    { $project: { booksFav: 1, _id: 0 } },
    { $unwind: "$booksFav" },
    { $match: { "booksFav.bookId": mongoose.Types.ObjectId(bookId) } },
    { $group: { _id: "_id", avgRate: { $avg: "$booksFav.rate" } } },
  ]).catch((err) => {
    console.log(err);
    throw new CustomError(500, "Internal Server Error");
  });
  if (usersRates.length > 0) return usersRates[0].avgRate.toFixed(1);
};

const updateBookRate = async (bookId, rate) => {
  const book = await Book.findOne({
    _id: mongoose.Types.ObjectId(bookId),
  }).catch((err) => {
    throw new CustomError(500, "Internal Server Error");
  });

  if (!book) {
    console.log("Error here");
    return new CustomError(500, "Internal Server Error");
  }
  book["rate"] = +rate;
  console.log(book);
  await book.save().catch((err) => {
    throw new CustomError(500, "Internal Server Error");
  });
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  addBookToFav,
  rateBookInFav,
};

/*Login based on session old way*/
// const login = async (req, res, next) => {
//   if (!req.body) return new CustomError("please insert data");
//   const { userName, password } = req.body;
//   const user = await User.findOne({ userName }).catch((err) => {
//     throw new CustomError(500, "Internal server error");
//   });
//   if (!user) return new CustomError("Unauthorized");
//   const comparePass = await bycrypt
//     .compare(password, user.password)
//     .catch((err) => {
//       throw new CustomError(500, "Internal server error");
//     });
//   if (comparePass) {
//     const token = new Token({ userId: user._id, createdAt: Date.now() });
//     const newToken = await token.save().catch((err) => {
//       throw new CustomError("internal server error");
//     });
//     res.cookie("serrionToken", newToken._id);
//     res.send(user);
//   } else {
//     res.statusCode = 401;
//     res.send("Unauthorized");
//   }
// };
