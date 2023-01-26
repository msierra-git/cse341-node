const {
   GraphQLObjectType,
   GraphQLSchema,
   GraphQLList,
   GraphQLID,
   GraphQLInt,
   GraphQLString,
   GraphQLNonNull
} = require('graphql');

const { CourseModel, CourseType } = require('../models/courses');
const { LocationModel, LocationType } = require('../models/locations');

const schemas = new GraphQLSchema({
   query: new GraphQLObjectType({
      name: 'Query',
      fields: {
         findAllCourses: {
            type: new GraphQLList(CourseType),
            resolve: (root, args, context, info) => {
               return CourseModel.find().exec();
            }
         },
         findCourse: {
            type: CourseType,
            args: {
               id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (root, args, context, info) => {
               return CourseModel.findById(args.id).exec();
            }
         },
         findAllLocations: {
            type: new GraphQLList(LocationType),
            resolve: (root, args, context, info) => {
               return LocationModel.find().exec();
            }
         },
         findLocation: {
            type: LocationType,
            args: {
               id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (root, args, context, info) => {
               return LocationModel.findById(args.id).exec();
            }
         }
      }
   }),
   mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: {
         course: {
            type: CourseType,
            args: {
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
            resolve: (root, args, context, info) => {
               const course = new CourseModel(args);
               return course.save();
            }
         },
         location: {
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
            resolve: (root, args, context, info) => {
               const location = new LocationModel(args);
               return location.save();
            }
         }
      }
   })
});

module.exports = schemas;
