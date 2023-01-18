const express = require('express');

const routes = express.Router();
const locationsController = require('../controllers/locations');

// this uses GET to retrieve document(s)/record(s)
routes.get('/', locationsController.findAllLocations);
routes.get('/:locationID', locationsController.findOneLocation);

// this uses POST to create new document/record
routes.post('/', locationsController.createLocation);

// this uses PUT to update document/record
routes.put('/:locationID', locationsController.updateLocation);

// this uses DElETE to remove document/record
routes.delete('/:locationID', locationsController.deleteLocation);

module.exports = routes;
