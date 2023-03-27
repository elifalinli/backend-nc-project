const express = require('express');
const { getCategories } = require('../be-nc-games/controllers/games.controllers');
const app = express();

app.get('/api/categories', getCategories)  



app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: 'Ooopss! Server error!' });
})


module.exports = app