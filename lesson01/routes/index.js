const express = require('express');
const routes = express.Router();
const actions = require('../controllers');


routes.get('/', actions.displayStartMessage);

module.exports = routes;