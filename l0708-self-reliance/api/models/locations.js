const mongoose = require('mongoose');
// const { composeWithMongoose } = require('graphql-compose-mongoose');

const { Schema } = mongoose;

const LocationModel = new Schema(
   {
      locationID: Number,
      locationType: String,
      locationName: String,
      address: String,
      contactPerson: String,
      contactNumber: String,
      roomName: String,
      capacity: Number
   }
   // ,
   // { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('locations', LocationModel);

// function LocationModel(posts) {
//    this.locationID = posts.body.locationID;
//    this.locationType = posts.body.locationType;
//    this.locationName = posts.body.locationName;
//    this.address = posts.body.address;
//    this.contactPerson = posts.body.contactPerson;
//    this.contactNumber = posts.body.contactNumber;
//    this.roomName = posts.body.roomName;
//    this.capacity = posts.body.capacity;
// }

// module.exports = { LocationModel };
