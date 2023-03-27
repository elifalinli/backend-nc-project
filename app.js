const express = require("express");
const {
  getCategories,
} = require("../be-nc-games/controllers/games.controllers");
const app = express();

app.get("/api/categories", getCategories);



app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "404: does not exist!" });
  } else {
    console.log(err);
    res.status(500).send({ msg: "Ooopss! Server error!" });
  }
});

module.exports = app;
