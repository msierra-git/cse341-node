const routes = require('express').Router();
const actions = require('../controllers/');

routes.get('/', actions.displayStartMessage);

module.exports = routes;