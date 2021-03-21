const express = require("express");
const cookieParser = require("cookie-parser");
const initMongoose = require("./DbContext/mongoose");

const { port } = require("./config.json");

const apiRouter = require("./routers/apiRouter");

const app = express();

initMongoose();

app.use(express.json());

app.use(cookieParser());

app.use("/api", apiRouter);

app.use(function errorHandler(err, req, res, next) {
  res.send(err.message);
});

app.listen(port, () => {
  console.log("listening on port", port);
});
