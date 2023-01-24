const express = require('express');

const routes = express.Router();
const locationsController = require('../controllers/locations');
const validation = require('../middleware/validate');
const security = require('../middleware/authorize');

// this uses GET to retrieve document(s)/record(s)
routes.get('/', locationsController.findAllLocations);
routes.get('/:locationID', validation.checkLocationParam, locationsController.findOneLocation);

// this uses POST to create new document/record
routes.post(
   '/',
   security.checkAuthority,
   validation.saveLocation,
   locationsController.createLocation
);

// this uses PUT to update document/record
routes.put(
   '/:locationID',
   security.checkAuthority,
   validation.checkLocationParam,
   validation.saveLocation,
   locationsController.updateLocation
);

// this uses DElETE to remove document/record
routes.delete(
   '/:locationID',
   security.checkAuthority,
   validation.checkLocationParam,
   locationsController.deleteLocation
);

module.exports = routes;
