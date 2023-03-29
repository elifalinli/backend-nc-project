const { path } = require("../app");
const { selectCategories, fetchReviewById, selectReviews } = require("../models/games.models");

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
      next(err)
})
}

exports.getReviews = (req,res,next) => {
  selectReviews()
  .then((reviews) => {
    res.status(200).send({ reviews });
  })
  .catch((err) => {
    next(err);
  })
  }