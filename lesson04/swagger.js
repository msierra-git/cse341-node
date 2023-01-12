const swaggerAutogen = require('swagger-autogen')();

const doc = {
   info: {
      title: 'My API',
      description: 'Description'
   },
   host: 'localhost:8080',
   schemes: ['http', 'https']
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
