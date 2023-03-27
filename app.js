const express = require('express');
const { getCategories, getReviewById } = require('../be-nc-games/controllers/games.controllers');
const app = express();

app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id', getReviewById)

app.use((err, req, res, next) => {
    if(err.status === 500){
        res.status(500).send({msg: 'Ooops! Server error!'})
    }
})


module.exports = app