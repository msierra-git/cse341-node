// const MongoClient = require('mongodb').MongoClient;
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let curDb;

const initDb = (callback) => {
   if (curDb) {
      console.log('Db is already initialized!');
      return callback(null, curDb);
   }
   MongoClient.connect(process.env.DB_URI)
      .then((client) => {
         curDb = client;
         callback(null, curDb);
      })
      .catch((err) => {
         callback(err);
      });
};

const getDb = () => {
   if (!curDb) {
      throw Error('Db not initialized');
   }
   return curDb;
};

module.exports = {
   initDb,
   getDb
};
