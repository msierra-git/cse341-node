const routes = require('express').Router();
const temples = require('../controllers/temple.js');

// Retrieve all Temples
routes.get('/all', temples.findAll);

// Create a new Temple
routes.post('/create', temples.create);

// Retrieve all published Temples
routes.get('/published', temples.findAllPublished);

// Retrieve a single Temple with id
routes.get('/:temple_id', temples.findOne);

// Update a Temple with id
routes.put('/:id', temples.update);

// Delete a Temple with id
routes.delete('/:id', temples.delete);

module.exports = routes;
