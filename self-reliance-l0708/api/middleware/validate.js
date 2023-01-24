const validator = require('../helper/validate');

const saveCourse = (req, res, next) => {
   const validationRule = {
      courseID: 'required|integer',
      courseName: 'required|string',
      courseLevel: 'required|string',
      courseType: 'string',
      locationID: 'integer',
      gatheringDay: 'string',
      gatheringTime: 'string',
      facilitator: 'required|string',
      enrolledMembers: 'integer'
   };

   validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
         res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
         });
      } else {
         next();
      }
   });
};

const saveLocation = (req, res, next) => {
   const validationRule = {
      locationID: 'required|integer',
      locationType: 'required|string',
      locationName: 'required|string',
      address: 'string',
      contactPerson: 'string',
      contactNumber: 'string',
      roomName: 'required|string',
      capacity: 'required|integer'
   };

   validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
         res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
         });
      } else {
         next();
      }
   });
};

const checkCourseParam = (req, res, next) => {
   const validationRule = { courseID: 'required|integer' };
   const reqParam = { courseID: req.params.courseID };

   validator(reqParam, validationRule, {}, (err, status) => {
      if (!status) {
         res.status(412).send({
            success: false,
            message: 'Validation failed. Invalid Course ID',
            data: err
         });
      } else {
         next();
      }
   });
};

const checkLocationParam = (req, res, next) => {
   const validationRule = { locationID: 'required|integer' };
   const reqParam = { locationID: req.params.locationID };

   validator(reqParam, validationRule, {}, (err, status) => {
      if (!status) {
         res.status(412).send({
            success: false,
            message: 'Validation failed. Invalid Location ID.',
            data: err
         });
      } else {
         next();
      }
   });
};

module.exports = {
   saveCourse,
   saveLocation,
   checkCourseParam,
   checkLocationParam
};
