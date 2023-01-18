const express = require('express');

const routes = express.Router();
const coursesController = require('../controllers/courses');

// this uses GET to retrieve document(s)/record(s)
routes.get('/', coursesController.findAllCourses);
routes.get('/:courseID', coursesController.findOneCourse);

// this uses POST to create new document/record
routes.post('/', coursesController.createCourse);

// this uses PUT to update document/record
routes.put('/:courseID', coursesController.updateCourse);

// this uses DElETE to remove document/record
routes.delete('/:courseID', coursesController.deleteCourse);

module.exports = routes;
