const db = require('../db/connection.js')
const categories = require('../db/data/test-data/categories')

exports.selectCategories = () => {
    return db.query(`SELECT * FROM categories`)
    .then(({rows}) => {
        return rows
    })
};

// exports.fetchReviewById = (id) => {

// }