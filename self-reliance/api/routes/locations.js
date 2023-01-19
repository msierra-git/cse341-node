const express = require('express');

const routes = express.Router();
const locationsController = require('../controllers/locations');
const validation = require('../middleware/validate');

// this uses GET to retrieve document(s)/record(s)
routes.get('/', locationsController.findAllLocations);
routes.get('/:locationID', validation.checkLocationParam, locationsController.findOneLocation);

// this uses POST to create new document/record
routes.post('/', validation.saveLocation, locationsController.createLocation);

// this uses PUT to update document/record
routes.put(
   '/:locationID',
   validation.checkLocationParam,
   validation.saveLocation,
   locationsController.updateLocation
);

// this uses DElETE to remove document/record
routes.delete('/:locationID', validation.checkLocationParam, locationsController.deleteLocation);

module.exports = routes;
