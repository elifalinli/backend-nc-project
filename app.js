const express = require("express");
const {
  getCategories,
} = require("../be-nc-games/controllers/games.controllers");
const app = express();

app.get("/api/categories", getCategories);

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
