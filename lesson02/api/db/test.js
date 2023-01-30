// Requiring module
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_URI;

// Database name
const databasename = 'self_reliance';

MongoClient.connect(url)
	.then((client) => {
		const connect = client.db(databasename);
		connect.createCollection('technologies', function (err, res) {
			if (err) throw err;
			console.log('Collection created!');
		});
		connect.listCollections().toArray(function (err, names) {
			if (!err) {
				console.log(names);
			}
		});
	})
	.catch((err) => {
		// Printing the error message
		console.log(err.Message);
	});
