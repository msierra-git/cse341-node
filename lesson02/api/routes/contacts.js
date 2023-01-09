const express = require('express');
const routes = express.Router();
const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.findAllContacts);
routes.get('/:id', contactsController.findOneContact);

module.exports = routes;
