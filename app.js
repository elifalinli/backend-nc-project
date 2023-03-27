const express = require('express');
const { getCategories } = require('../be-nc-games/controllers/games.controllers');
const app = express();

app.get('/api/categories', getCategories)


module.exports = app