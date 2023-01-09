// const express = require('express');
const ObjectID = require('mongodb').ObjectId;
const mongodb = require('../db/connectdb');

const findAllContacts = async (req, res) => {
   const result = await mongodb.getDb().db('cse341_projects').collection('contacts').find();

   if (result) {
      result.toArray().then((lists) => {
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(lists);
      });
      console.log(`Found contacts in the collection`);
   } else {
      console.log(`No contacts found in the collection`);
   }
};

const findOneContact = async (req, res) => {
   const userId = new ObjectID(req.params.id);
   const result = await mongodb
      .getDb()
      .db('cse341_projects')
      .collection('contacts')
      .find({ _id: userId });

   if (result) {
      result.toArray().then((lists) => {
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(lists[0]);
      });

      console.log(`Found contact in the collection with the ID '${userId}':`);
      // console.log(result);
   } else {
      console.log(`No contacts found with the ID: '${userId}'`);
   }
};

const createContact = async (req, res) => {
   const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
   };

   const result = await mongodb
      .getDb()
      .db('cse341_projects')
      .collection('contacts')
      .insertOne(newContact);

   if (result.acknowledged) {
      res.status(201).json(result);
      console.log(`New contact created with new ID: ${result.insertedId}`);
   } else {
      res.status(500).json(result.error || 'An error occurred while creating the contact.');
      console.log('An error occurred while creating the contact');
   }
};

const updateContact = async (req, res) => {
   const userId = new ObjectID(req.params.id);

   const newContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
   };

   const result = await mongodb
      .getDb()
      .db('cse341_projects')
      .collection('contacts')
      .replaceOne({ _id: userId }, newContact);

   if (result.modifiedCount > 0) {
      res.status(204).send();
      console.log(`Contact updated with user ID: ${userId}`);
   } else {
      res.status(500).json(result.error || 'An error occurred while updating the contact.');
      console.log('An error occurred while updating the contact');
   }
};

const deleteContact = async (req, res) => {
   const userId = new ObjectID(req.params.id);

   const result = await mongodb
      .getDb()
      .db('cse341_projects')
      .collection('contacts')
      .deleteOne({ _id: userId });

   if (result.deletedCount > 0) {
      res.status(200).send();
      console.log(`Contact deleted with user ID: ${userId}`);
   } else {
      res.status(500).json(result.error || 'An error occurred while deleting the contact.');
      console.log('An error occurred while deleting the contact');
   }
};

module.exports = { findAllContacts, findOneContact, createContact, updateContact, deleteContact };
