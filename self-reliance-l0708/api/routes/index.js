const express = require('express');
// const contacts = require('./contacts');
const swagger = require('./swagger');

const routes = express.Router();

routes.use('/', swagger);
routes.use('/courses', require('./courses'));
routes.use('/locations', require('./locations'));

module.exports = routes;
