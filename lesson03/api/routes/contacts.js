const express = require('express');

const routes = express.Router();
const contactsController = require('../controllers/contacts');

// this uses GET to retrieve document(s)/record(s)
routes.get('/', contactsController.findAllContacts);
routes.get('/:id', contactsController.findOneContact);

// this uses POST to create new document/record
routes.post('/', contactsController.createContact);

// this uses PUT to update document/record
routes.put('/:id', contactsController.updateContact);

// this uses DElETE to remove document/record
routes.delete('/:id', contactsController.deleteContact);

module.exports = routes;
