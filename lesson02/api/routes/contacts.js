const express = require('express');
const routes = express.Router();
const contactsController = require('../controllers/contacts');

routes.get('/', contactsController.findAllContacts);
routes.get('/:id', contactsController.findOneContact);
routes.post('/', contactsController.createContact);
routes.put('/:id', contactsController.updateContact);
routes.delete('/:id', contactsController.deleteContact);

module.exports = routes;
