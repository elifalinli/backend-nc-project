const { path } = require("../app");
// const categories = require("../db/data/test-data/categories")
const { selectCategories, fetchReviewById } = require("../models/games.models")


exports.getCategories = (req, res) => {
selectCategories()
.then((categories) => {
    res.status(200).send({categories})})
    .catch((err) => {
        console.log(err)
        res.status(400).send({msg: 'Invalid path!'})
    });
};

exports.getReviewById = (req,res) => {
    const { review_id } = req.params;
    fetchReviewById(review_id)
    .then((review) => {
    res.status(200).send({ review })
})
.catch((err) =>{
     next(err)
})
}
