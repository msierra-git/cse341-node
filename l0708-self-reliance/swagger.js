const swaggerAutogen = require('swagger-autogen')();

const doc = {
   info: {
      title: 'Self-Reliance Courses',
      description: `Tracks all self-reliance course details in the stakes, like the name of course, facilitator and where and when the class is held.<br><br>Note that a valid authorization is required for changing (update, create, delete) the data collection. <br><br>Please click here to <a href="https://sierra341-07.onrender.com/login" target="_blank">login</a> or click here to <a href="https://sierra341-07.onrender.com/logout" target="_blank">logout</a>.`,
      version: '1.0.0',
      contact: {
         name: 'A. Michael Sierra',
         email: 'sie20003@byui.edu'
      }
   },

   servers: [
      {
         url: 'http://localhost:3000',
         description: 'Development server for testing'
      },
      {
         url: 'http://localhost:3000/login',
         description: 'Develoment login server for authorization'
      },
      {
         url: 'https://sierra341-07.onrender.com',
         description: 'Production server using Render'
      },
      {
         url: 'https://sierra341-07.onrender.com/login',
         description: 'Production login server for authorization'
      }
   ],

   // URL for localhost
   // host: 'localhost:3000',
   // schemes: ['http']
   host: 'sierra341-07.onrender.com',
   schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./api/routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

// Generates swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
// 	await import('./index.js');
// });
