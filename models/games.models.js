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

exports.fetchCommentsByReviewId = (id) => {
  const psqlQueryReview = `SELECT * FROM reviews WHERE review_id = $1`;
  const psqlQueryComments = `SELECT * FROM comments WHERE review_id = $1 ORDER BY created_at DESC`;

  return Promise.all([
    db.query(psqlQueryReview, [id]),
    db.query(psqlQueryComments, [id]),
  ]).then(([reviewResult, commentsResult]) => {
    if (reviewResult.rowCount === 0) {
      return Promise.reject({ status: 404, msg: `comments not found!` });
    }
    return commentsResult.rows;
  });
};

exports.insertComment = (newComment, id) => {
  const psqlQueryReview = `SELECT * FROM reviews WHERE review_id = $1`;
  const psqlQueryInsert = `INSERT INTO comments (author, body, review_id) VALUES ($1, $2, $3) RETURNING *;`;

  const { username, body } = newComment;
  return db.query(psqlQueryReview, [id]).then((reviewResult) => {
    if (reviewResult.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `ID does not exist!`,
      });
    }

    return db.query(psqlQueryInsert, [username, body, id]).then(({ rows }) => {
      return rows[0];
    });
  });
};

exports.updateComment = (updatedComment, id) => {
  const psqlQuery = `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *`;
  const psqlQueryReview = `SELECT * FROM reviews WHERE review_id = $1`;
  const { inc_votes } = updatedComment;
  return db.query(psqlQueryReview, [id]).then((reviewResult) => {
    if (reviewResult.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `ID does not exist!`,
      });
    }
    return db.query(psqlQuery, [inc_votes, id]).then(({ rows }) => {
      return rows[0]
    });
  });
};

exports.removeComment = (id) => {
  psqlQuery = `DELETE FROM comments WHERE comment_id = $1 RETURNING *;`
  const psqlQueryCommentId = `SELECT * FROM comments WHERE comment_id = $1`;
  return db.query(psqlQueryCommentId, [id]).then((commentResult) => {
    if (commentResult.rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `ID does not exist!`,
      });
    }
  return db.query(psqlQuery, [id]).then((res) => {
    return res.rows
  });
});
};

exports.selectUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
}