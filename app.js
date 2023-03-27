const express = require('express');
const { getCategories } = require('../be-nc-games/controllers/games.controllers');
const app = express();

app.get('/api/categories', getCategories)

app.use((err, req, res, next) => {
    if(err.status === 500){
        res.status(500).send({msg: 'Ooops! Server error!'})
    }
})


module.exports = app