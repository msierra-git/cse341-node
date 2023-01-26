const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

const connectDB = () => {
   db.mongoose
      .set('strictQuery', false)
      .connect(process.env.DB_URI, {
         dbName: 'self_reliance',
         useNewUrlParser: true,
         useUnifiedTopology: true
      })
      .then(() => {
         console.log('Connected to the database through Mongoose!');
      })
      .catch((err) => {
         console.log('Cannot connect to the database!', err);
         process.exit();
      });
};

connectDB((err, mongoosedb) => {
   if (err) {
      console.log(err);
   } else {
      console.log(`Connected to DB through Mongoose`);
   }
});

module.exports = { connectDB };
