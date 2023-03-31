const express = require("express");
const {
  getCategories,
  getReviewById,
  getReviews,
  getCommentsByReviewId,
  postComment
} = require("../be-nc-games/controllers/games.controllers");
const { handlePSQL400s, handleCustomErrors, handle500statuses, handleForeignKeyErrors, handleNullKeyErrors } = require("./controllers/error-handling.controllers");
const app = express();
app.use(express.json())

app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId )

app.post('/api/reviews/:review_id/comments', postComment)

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found!" });
});

app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handleForeignKeyErrors);
app.use(handleNullKeyErrors);
app.use(handle500statuses);



module.exports = app;
