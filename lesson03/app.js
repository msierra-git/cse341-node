// L03 - Assignment
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./api/db/connectdb');

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json())
   .use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
   })
   .use('/', require('./api/routes'));

mongodb.initDb((err, mongodbStatus) => {
   if (err) {
      console.log(err);
   } else {
      app.listen(port);
      console.log(`Connected to DB and App listening on port ${port}`);
   }
});
