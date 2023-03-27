const db = require('../db/connection.js')
const categories = require('../db/data/test-data/categories')

exports.selectCategories = () => {
    return db.query(`SELECT * FROM categories`)
    .then(({rows}) => {
        return rows
    })
};

// exports.fetchReviewById = (id) => {
// return db.query(`SELECT * FROM reviews WHERE review_id = &1;`, [id])
// .then((result) => {
//     console.log(result.rows)
//     return result.rows[0]
// })
// }