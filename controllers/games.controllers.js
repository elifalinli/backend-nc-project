const { path } = require("../app");
const categories = require("../db/data/test-data/categories")
const { selectCategories } = require("../models/games.models")


exports.getCategories = (req, res) => {
selectCategories()
.then((categories) => {
    res.status(200).send({categories})})
    .catch((err) => {
        console.log(err)
        res.status(400).send({msg: 'Invalid path!'})
    });
};

// exports.getReviewId = (req,res) => {
//     // const id = 
//     // console.log(req.params)
//     fetchReviewById()
// }