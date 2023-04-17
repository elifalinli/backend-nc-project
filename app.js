const express = require("express");
const cors = require('cors')
const {
  getCategories,
  getReviewById,
  getReviews,
  getCommentsByReviewId,
  postComment,
  patchComment,
  deleteComment,
  getUsers,
} = require("./controllers/games.controllers.js");
const { handlePSQL400s, handleCustomErrors, handle500statuses, handleForeignKeyErrors, handleNullKeyErrors } = require("./controllers/error-handling.controllers.js");
const app = express();
app.use(cors()); 
app.use(express.json())


app.get("/api/categories", getCategories);

app.get("/api/reviews/:review_id", getReviewById);

app.get("/api/reviews", getReviews);

app.get("/api/reviews/:review_id/comments", getCommentsByReviewId )

app.post('/api/reviews/:review_id/comments', postComment)

app.patch('/api/reviews/:review_id', patchComment)

app.delete('/api/comments/:comment_id', deleteComment)

app.get('/api/users', getUsers)

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "Page not found!" });
});

app.use(handlePSQL400s);
app.use(handleCustomErrors);
app.use(handleForeignKeyErrors);
app.use(handleNullKeyErrors);
app.use(handle500statuses);



module.exports = app;
