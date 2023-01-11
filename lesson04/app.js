// L03 - Assignment
const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = require('./api/db/connectdb');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json())
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
