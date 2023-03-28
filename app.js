const express = require("express");
const {
  getCategories,
  getReviewById,
} = require("../be-nc-games/controllers/games.controllers");
const app = express();

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found!" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Ooopss! Server error!" });

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found!" });
});

app.use((err, req, res, next) => {
  if (err.status === 500) {
    console.log(err);
    res.status(500).send({ msg: "Ooopss! Server error!" });
  }
});

module.exports = app;
