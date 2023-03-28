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
    .then(({rows}) => {
        const review = rows[0]
     if(!review) { 
        return  Promise.reject({
            status: 404, msg: `review not found!`},);
     } 
      return review;
    });
};
