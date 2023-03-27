const categories = require("../db/data/test-data/categories")
const { selectCategories } = require("../models/games.models")


exports.getCategories = (req, res) => {
selectCategories()
.then((categories) => {
    res.status(200).send({categories})})
    .catch((err) => {
        console.log(err)
    });
};