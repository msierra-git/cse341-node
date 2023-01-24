const ObjectID = require('mongodb').ObjectId;
const mongoDB = require('../db/connectdb');
const LocationModel = require('../models/locations');

const findAllLocations = async (req, res) => {
   /*
    #swagger.description = 
      'This will get all self-reliance location records or documents <br/><br>'	 	
   */
   try {
      const result = await mongoDB.getDb().db('self_reliance').collection('locations').find();

      if (result) {
         result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
         });
         console.log(`Found SR locations in the collection`);
      } else {
         console.log(`No SR locations found in the collection`);
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

const findOneLocation = async (req, res) => {
   /*
    #swagger.description = 
      'This will find one self-reliance location based on the custom ID called locationID.'	 	
   */
   try {
      // const locationID = new ObjectID(req.params.locationID);
      const locationID = parseInt(req.params.locationID, 10);
      const result = await mongoDB
         .getDb()
         .db('self_reliance')
         .collection('locations')
         .find({ locationID: locationID });

      if (result) {
         result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
         });

         console.log(`Found SR location in the collection with the ID '${locationID}':`);
         // console.log(result);
      } else {
         console.log(`No SR location found with the ID: '${locationID}'`);
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

const createLocation = async (req, res) => {
   /*
    #swagger.description = 
      'This will create one self-reliance location using the data in JSON format.<br>
       It will then return the ID of the new record if operation is successful.<br>
       This operation requires a valid authorization.'	 	
   */
   try {
      // Parameter not being recognised by Swagger UI when using the code on line 61.
      // const newLocation = new LocationModel(req);
      const newLocation = {
         locationID: req.body.locationID,
         locationType: req.body.locationType,
         locationName: req.body.locationName,
         address: req.body.address,
         contactPerson: req.body.contactPerson,
         contactNumber: req.body.contactNumber,
         roomName: req.body.roomName,
         capacity: req.body.capacity
      };
      const result = await mongoDB
         .getDb()
         .db('self_reliance')
         .collection('locations')
         .insertOne(newLocation);

      if (result.acknowledged) {
         res.status(201).json(result);
         console.log(`New SR location created with new ID: ${result.insertedId}`);
      } else {
         res.status(400).json(result.error || 'An error occurred while creating the SR location.');
         console.log('An error occurred while creating the SR location');
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

const updateLocation = async (req, res) => {
   /*
    #swagger.description = 
      'This will update the details of the self-reliance location based on the supplied custom 
       ID called locationID.<br>It will use the new information as supplied in JSON format.<br>
       This operation requires a valid authorization.'	     
   */
   try {
      // const locationID = new ObjectID(req.params.locationID);
      const locationID = parseInt(req.params.locationID, 10);
      // const newLocation = new LocationModel(req);
      const newLocation = {
         locationID: req.body.locationID,
         locationType: req.body.locationType,
         locationName: req.body.locationName,
         address: req.body.address,
         contactPerson: req.body.contactPerson,
         contactNumber: req.body.contactNumber,
         roomName: req.body.roomName,
         capacity: req.body.capacity
      };
      const result = await mongoDB
         .getDb()
         .db('self_reliance')
         .collection('locations')
         .updateOne({ locationID: locationID }, { $set: newLocation });

      if (result.modifiedCount > 0) {
         res.status(204).send();
         console.log(`Updated SR location with location ID: ${locationID}`);
      } else {
         res.status(400).json(result.error || 'An error occurred while updating the SR location.');
         console.log('An error occurred while updating the SR location');
      }
   } catch (err) {
      res.status(500).json(err || 'Error in MongoDB Update Operation');
      console.log('Error in MongoDB Update Operation');
   }
};

const deleteLocation = async (req, res) => {
   /*
    #swagger.description = 
      'This will remove the self-reliance location based on the supplied custom ID called locationID.<br>
       This operation requires a valid authorization.'	 	
   */
   try {
      // const locationID = new ObjectID(req.params.locationID);
      const locationID = parseInt(req.params.locationID, 10);

      const result = await mongoDB
         .getDb()
         .db('self_reliance')
         .collection('locations')
         .deleteOne({ locationID: locationID });

      if (result.deletedCount > 0) {
         res.status(200).send();
         console.log(`SR location deleted with location ID: ${locationID}`);
      } else {
         res.status(400).json(result.error || 'An error occurred while deleting the SR location.');
         console.log('An error occurred while deleting the SR location');
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

module.exports = {
   findAllLocations,
   findOneLocation,
   createLocation,
   updateLocation,
   deleteLocation
};
