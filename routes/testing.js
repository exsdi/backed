const express = require('express');

const routes = express.Router();

routes.get('/add', (req, res) => {
    res.send('Hello World!');
});

module.exports = routes;