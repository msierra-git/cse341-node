const express = require('express');
const routes = express.Router();

routes.use('/contacts', require('./contacts'));

module.exports = routes;