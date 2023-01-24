const express = require('express');
const { requiresAuth } = require('express-openid-connect');

const routes = express.Router();
const coursesController = require('../controllers/courses');
const validation = require('../middleware/validate');

// this uses GET to retrieve document(s)/record(s)
routes.get('/', coursesController.findAllCourses);
routes.get('/:courseID', validation.checkCourseParam, coursesController.findOneCourse);

// this uses POST to create new document/record
routes.post('/', requiresAuth(), validation.saveCourse, coursesController.createCourse);

// this uses PUT to update document/record
routes.put(
   '/:courseID',
   requiresAuth(),
   validation.checkCourseParam,
   validation.saveCourse,
   coursesController.updateCourse
);

// this uses DElETE to remove document/record
routes.delete(
   '/:courseID',
   requiresAuth(),
   validation.checkCourseParam,
   coursesController.deleteCourse
);

module.exports = routes;
