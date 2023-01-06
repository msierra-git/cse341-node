const express = require('express');
const mongodb = require('../db/connectdb');
const ObjectID = require('mongodb').ObjectId;


const findAllContacts = async (req, res, next) => {
   const result = await mongodb
      .getDb()
      .db('cse341_projects')
      .collection('contacts')
      .find();

   if (result) {
      result.toArray().then((lists) => {
         res.setHeader('Content-Type', 'application/json');
         res.status(200).json(lists);
         });
         console.log(`Found contacts in the collection`);
   } else {
       console.log(`No contacts found in the collection`);
   }
}


const findOneContact = async (req, res, next) => {
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
         console.log(`Found a contact in the collection with the ID '${userId}':`);
         // console.log(result);
   } else {
       console.log(`No contacts found with the ID: '${userId}'`);
   }
}

module.exports = { findAllContacts, findOneContact };