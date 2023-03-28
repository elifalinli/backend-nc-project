const { path } = require("../app");
const categories = require("../db/data/test-data/categories")
const { selectCategories } = require("../models/games.models")


exports.getCategories = (req, res, next) => {
selectCategories()
.then((categories) => {
res.status(200).send({categories})
})
.catch((err) => {
   next(err) 
})
};
