const { path } = require("../app");
const {
  selectCategories,
  fetchReviewById,
  selectReviews,
  fetchCommentsByReviewId,
  insertComment
} = require("../models/games.models");

exports.getCategories = (req, res, next) => {
  selectCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  fetchReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  selectReviews()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByReviewId = (req, res, next) => {
  const { review_id } = req.params;
  fetchCommentsByReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req,res,next) => {
  const newComment = req.body;
  const id = req.params.review_id
  insertComment(newComment, id).then((comment) => {
    res.status(201).send({comment: comment})
  })
  .catch((err) => {
    console.log(err)
    next(err);
  });
}