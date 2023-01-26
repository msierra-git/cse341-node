const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = require('graphql');

const LocationModel = mongoose.model('locations', {
   locationID: Number,
   locationType: String,
   locationName: String,
   address: String,
   contactPerson: String,
   contactNumber: String,
   roomName: String,
   capacity: Number
});

const LocationType = new GraphQLObjectType({
   name: 'Location',
   fields: {
      _id: { type: GraphQLID },
      locationID: { type: GraphQLInt },
      locationType: { type: GraphQLString },
      locationName: { type: GraphQLString },
      address: { type: GraphQLString },
      contactPerson: { type: GraphQLString },
      contactNumber: { type: GraphQLString },
      roomName: { type: GraphQLString },
      capacity: { type: GraphQLInt }
   }
});

module.exports = { LocationModel, LocationType };

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
