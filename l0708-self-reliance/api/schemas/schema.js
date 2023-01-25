const graphql = require('graphql');
const CourseModel = require('../models/courses');
const Location = require('../models/locations');

const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLID,
   GraphQLInt,
   GraphQLSchema,
   GraphQLList,
   GraphQLNonNull
} = graphql;

// Schema defines data on the Graph like object types(Course type), relation between
// these object types and describes how it can reach into the graph to interact with
// the data to retrieve or mutate the data

const LocationType = new GraphQLObjectType({
   name: 'Location',
   fields: () => ({
      locationID: { type: GraphQLInt },
      locationType: { type: GraphQLString },
      locationName: { type: GraphQLString },
      address: { type: GraphQLString },
      contactPerson: { type: GraphQLString },
      contactNumber: { type: GraphQLString },
      roomName: { type: GraphQLString },
      capacity: { type: GraphQLInt }
   })
});

const CourseType = new GraphQLObjectType({
   name: 'Course',
   // We are wrapping fields in the function as we dont want to execute this ultil
   // everything is inilized. For example below code will throw error LocationType not
   // found if not wrapped in a function
   fields: () => ({
      courseID: { type: GraphQLInt },
      courseName: { type: GraphQLString },
      courseLevel: { type: GraphQLString },
      courseType: { type: GraphQLString },
      locationID: { type: GraphQLInt },
      gatheringDay: { type: GraphQLString },
      gatheringTime: { type: GraphQLString },
      facilitator: { type: GraphQLString },
      enrolledMembers: { type: GraphQLInt }
   })
});

// RootQuery describe how users can use the graph and grab data.
// E.g Root query to get all courses, get all locations, get a particular
// course or get a particular location.
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
      course: {
         type: CourseType,
         // argument passed by the user while making the query
         args: { courseID: { type: GraphQLInt } },
         resolve(parent, args) {
            // Here we define how to get data from database source

            // this will return the Course with id passed in argument
            // by the user
            return CourseModel.findById(args.courseID);
         }
      },
      courses: {
         type: new GraphQLList(CourseType),
         resolve(parent, args) {
            return CourseModel.find({});
         }
      },
      location: {
         type: LocationType,
         args: { locationID: { type: GraphQLInt } },
         resolve(parent, args) {
            return Location.findById(args.locationID);
         }
      },
      locations: {
         type: new GraphQLList(LocationType),
         resolve(parent, args) {
            return Location.find({});
         }
      }
   }
});

const Mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
      addCourse: {
         type: CourseType,
         args: {
            // GraphQLNonNull make these field required
            courseID: { type: new GraphQLNonNull(GraphQLInt) },
            courseName: { type: new GraphQLNonNull(GraphQLString) },
            courseLevel: { type: new GraphQLNonNull(GraphQLString) },
            courseType: { type: GraphQLString },
            locationID: { type: GraphQLInt },
            gatheringDay: { type: GraphQLString },
            gatheringTime: { type: GraphQLString },
            facilitator: { type: new GraphQLNonNull(GraphQLString) },
            enrolledMembers: { type: GraphQLInt }
         },
         resolve(parent, args) {
            const course = new CourseModel({
               courseID: args.courseID,
               courseName: args.courseName,
               courseLevel: args.courseLevel,
               courseType: args.courseType,
               locationID: args.locationID,
               gatheringDay: args.gatheringDay,
               gatheringTime: args.gatheringTime,
               facilitator: args.facilitator,
               enrolledMembers: args.enrolledMembers
            });
            return course.save();
         }
      },
      addLocation: {
         type: LocationType,
         args: {
            locationID: { type: new GraphQLNonNull(GraphQLInt) },
            locationType: { type: new GraphQLNonNull(GraphQLString) },
            locationName: { type: new GraphQLNonNull(GraphQLString) },
            address: { type: GraphQLString },
            contactPerson: { type: GraphQLString },
            contactNumber: { type: GraphQLString },
            roomName: { type: new GraphQLNonNull(GraphQLString) },
            capacity: { type: new GraphQLNonNull(GraphQLInt) }
         },
         resolve(parent, args) {
            const location = new Location({
               locationID: args.locationID,
               locationType: args.locationType,
               locationName: args.locationName,
               address: args.address,
               contactPerson: args.contactPerson,
               contactNumber: args.contactNumber,
               roomName: args.roomName,
               capacity: args.capacity
            });
            return location.save();
         }
      }
   }
});

// Creating a new GraphQL Schema, with options query which defines query
// we will allow users to use when they are making request.

module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});
