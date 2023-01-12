const express = require('express');
// const contacts = require('./contacts');
const swagger = require('./swagger');

const routes = express.Router();

routes.use('/', swagger);
routes.use('/contacts', require('./contacts'));

module.exports = routes;
