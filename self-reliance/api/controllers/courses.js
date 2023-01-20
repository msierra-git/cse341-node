const ObjectID = require('mongodb').ObjectId;
const mongoDB = require('../db/connectdb');
const CourseModel = require('../models/courses');

const findAllCourses = async (req, res) => {
   /*
    #swagger.description = 
      'This will get all self-reliance course records or documents <br/><br>'	 	
   */
   try {
      const result = await mongoDB.getDb().db('self_reliance').collection('courses').find();

      if (result) {
         result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
         });
         console.log(`Found SR Courses in the collection`);
      } else {
         console.log(`No SR Courses found in the collection`);
      }
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

const findOneCourse = async (req, res) => {
   /*
    #swagger.description = 
      'This will find one self-reliance course based on the custom ID called courseID.'	 	
   */
   try {
      // const courseID = new ObjectID(req.params.courseID);
      const courseID = parseInt(req.params.courseID, 10);
      const result = await mongoDB
         .getDb()
         .db('self_reliance')
         .collection('courses')
         .find({ courseID: courseID });

      if (result) {
         result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
         });

         console.log(`Found SR Course in the collection with the ID '${courseID}':`);
         // console.log(result);
      } else {
         res.status(404).json({ message: 'No SR Course found' });
         console.log(`No SR Course found with the ID: '${courseID}'`);
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

const createCourse = async (req, res) => {
   /*
    #swagger.description = 
      'This will create one self-reliance course using the data in JSON format.<br>
       It will then return the ID of the new record if operation is successful.'	 	
   */
   try {
      // const newCourse = CourseModel(req);
      const newCourse = {
         courseID: req.body.courseID,
         courseName: req.body.courseName,
         courseLevel: req.body.courseLevel,
         courseType: req.body.courseType,
         locationID: req.body.locationID,
         gatheringDay: req.body.gatheringDay,
         gatheringTime: req.body.gatheringTime,
         facilitator: req.body.facilitator,
         enrolledMembers: req.body.enrolledMembers
      };
      const result = await mongoDB
         .getDb()
         .db('self_reliance')
         .collection('courses')
         .insertOne(newCourse);

      if (result.acknowledged) {
         res.status(201).json(result);
         console.log(`New SR Course created with new record ID: ${result.insertedId}`);
      } else {
         res.status(500).json(result.error || 'An error occurred while creating the SR Course.');
         console.log('An error occurred while creating the SR Course');
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

const updateCourse = async (req, res) => {
   /*
    #swagger.description = 
      'This will update the details of the self-reliance course based on the supplied custom 
       ID called courseID.<br>It will use the new information as supplied in JSON format.'	     
   */
   try {
      // const courseID = new ObjectID(req.params.courseID);
      const courseID = parseInt(req.params.courseID, 10);
      // const newCourse = new CourseModel(req);
      const newCourse = {
         courseName: req.body.courseName,
         courseLevel: req.body.courseLevel,
         courseType: req.body.courseType,
         locationID: req.body.locationID,
         gatheringDay: req.body.gatheringDay,
         gatheringTime: req.body.gatheringTime,
         facilitator: req.body.facilitator,
         enrolledMembers: req.body.enrolledMembers
      };
      const result = await mongoDB
         .getDb()
         .db('self_reliance')
         .collection('courses')
         .updateOne({ courseID: courseID }, { $set: newCourse });

      if (result.modifiedCount > 0) {
         res.status(204).send();
         console.log(`Updated SR Course with course ID: ${courseID}`);
      } else {
         res.status(500).json(result.error || 'An error occurred while updating the SR Course.');
         console.log('An error occurred while updating the SR Course');
      }
   } catch (err) {
      res.status(500).json(err || 'Error in MongoDB Update Operation');
      console.log('Error in MongoDB Update Operation');
   }
};

const deleteCourse = async (req, res) => {
   /*
    #swagger.description = 
      'This will remove the self-reliance course based on the supplied custom ID called courseID.'	 	
   */
   try {
      // const courseID = new ObjectID(req.params.courseID);
      const courseID = parseInt(req.params.courseID, 10);

      const result = await mongoDB
         .getDb()
         .db('self_reliance')
         .collection('courses')
         .deleteOne({ courseID: courseID });

      if (result.deletedCount > 0) {
         res.status(200).send();
         console.log(`SR Course deleted with course ID: ${courseID}`);
      } else {
         res.status(500).json(result.error || 'An error occurred while deleting the SR Course.');
         console.log('An error occurred while deleting the SR Course');
      }
   } catch (err) {
      res.status(500).json(err);
   }
};

module.exports = {
   findAllCourses,
   findOneCourse,
   createCourse,
   updateCourse,
   deleteCourse
};
