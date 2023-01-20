// L05 - Assignment - Project 2 - 'Self-Reliance Courses and Locations'
// L06 - Assignment - additional error handling and data validations
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const mongoDB = require('./api/db/connectdb');

const port = process.env.PORT || 8080;
const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
   .use(cors())
   .use(bodyParser.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
         'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
      );
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      next();
   })
   .use('/', require('./api/routes'));

mongoDB.initDb((err, mongodb) => {
   if (err) {
      console.log(err);
   } else {
      app.listen(port);
      console.log(`Connected to DB and App listening on port ${port}`);
   }
});
