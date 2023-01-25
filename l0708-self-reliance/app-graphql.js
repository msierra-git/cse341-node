// L05 - Assignment - Project 2 - 'Self-Reliance Courses and Locations'
// L06 - Assignment - additional error handling and data validations
// L07 - Assignment - continue progressing the project
// L08 - Assignment - implement Auth0 in the project and GraphQL
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const { auth, requiresAuth } = require('express-openid-connect');
const mongoose = require('mongoose');

const { graphqlHTTP } = require('express-graphql');
const schema = require('./api/schemas/schema');

const swaggerDocument = require('./swagger.json');
const mongoDB = require('./api/db/connectdb');

const courses = require('./api/models/courses');

const router = express.Router();

const port = process.env.PORT || 3000;

const config = {
   authRequired: false,
   auth0Logout: true,
   secret: process.env.SECRET,
   baseURL: process.env.BASE_URL,
   clientID: process.env.CLIENT_ID,
   issuerBaseURL: process.env.ISSUER_BASE_URL
};

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI);
mongoose.connection.once('open', () => {
   console.log('Conneted to database through Mongoose');
});

const app = express();

async function all(res, req) {
   const result = courses.find({});
   console.log(result);
   return result;
}

app.get('/test', (req, res) => {
   const posts = all(req, res);
   res.send(posts);
});

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
   // res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
   const pgstatus = req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out';
   res.send(pgstatus);
});

app.get('/profile', requiresAuth(), (req, res) => {
   res.send(JSON.stringify(req.oidc.user));
});

// This route will be used as an endpoint to interact with Graphql,
// All queries will go through this route.
app.use(
   '/graphql',
   graphqlHTTP({
      schema,
      graphiql: true
   })
);

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

// mongoDB.initDb((err, mongodb) => {
//    if (err) {
//       console.log(err);
//    } else {
//       app.listen(port);
//       console.log(`Connected to DB and App listening on port ${port}`);
//    }
// });
app.listen(port);
