const db = require("../db/connection.js");
const categories = require("../db/data/test-data/categories");
const reviews = require("../db/data/test-data/reviews");

exports.selectCategories = () => {
  return db.query(`SELECT * FROM categories`).then(({ rows }) => {
    return rows;
  });
};

exports.fetchReviewById = (id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1;`, [id])
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({
          status: 404,
          msg: `review not found!`,
        });
      }
      return review;
    });
};
exports.selectReviews = () => {
  const psqlQuery = `SELECT reviews.review_id, reviews.owner, reviews.votes, 
  reviews.designer, reviews.created_at, reviews.title, reviews.category,
   reviews.review_img_url, COUNT(comments.review_id):: INT AS comment_count
  FROM reviews
  LEFT JOIN comments
  ON comments.review_id = reviews.review_id
  GROUP BY reviews.review_id
  ORDER BY reviews.created_at DESC;`;
  return db.query(psqlQuery, []).then(({ rows }) => {
    return rows;
  });
};
