const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = require('graphql');

const CourseModel = mongoose.model('courses', {
   courseID: Number,
   courseName: String,
   courseLevel: String,
   courseType: String,
   locationID: Number,
   gatheringDay: String,
   gatheringTime: String,
   facilitator: String,
   enrolledMembers: Number
});

const CourseType = new GraphQLObjectType({
   name: 'Course',
   fields: {
      _id: { type: GraphQLID },
      courseID: { type: GraphQLInt },
      courseName: { type: GraphQLString },
      courseLevel: { type: GraphQLString },
      courseType: { type: GraphQLString },
      locationID: { type: GraphQLInt },
      gatheringDay: { type: GraphQLString },
      gatheringTime: { type: GraphQLString },
      facilitator: { type: GraphQLString },
      enrolledMembers: { type: GraphQLInt }
   }
});

module.exports = { CourseModel, CourseType };

// function CourseModel(data) {
//    this.courseID = data.body.courseID;
//    this.courseName = data.body.courseName;
//    this.courseLevel = data.body.courseLevel;
//    this.courseType = data.body.courseType;
//    this.locationID = data.body.locationID;
//    this.gatheringTime = data.body.gatheringTime;
//    this.facilitator = data.body.facilitator;
//    this.enrolledMembers = data.body.enrolledMembers;
// }

// function CourseModel2(data) {
//    return {
//       courseID: data.body.courseID,
//       courseName: data.body.courseName,
//       courseLevel: data.body.courseLevel,
//       courseType: data.body.courseType,
//       locationID: data.body.locationID,
//       gatheringTime: data.body.gatheringTime,
//       facilitator: data.body.facilitator,
//       enrolledMembers: data.body.enrolledMembers
//    };
// }

// module.exports = { CourseModel };
