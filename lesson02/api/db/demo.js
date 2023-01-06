const { MongoClient } = require('mongodb');
const oneEntry = {
   name: "Lovely",
   summary: "a charming",
   bedrooms: 1,
   bathrooms: 1
};

const multipleEntries = [
   {
      name: "Infinite Views",
      summary: "Modern home with infinite views from the infinity pool",
      property_type: "House",
      bedrooms: 5,
      bathrooms: 4.5,
      beds: 5
   },
   {
      name: "Private room in London",
      property_type: "Apartment",
      bedrooms: 1,
      bathroom: 1
   },
   {
      name: "Beautiful Beach House",
      summary: "Enjoy relaxed beach living in this house with a private beach",
      bedrooms: 4,
      bathrooms: 2.5,
      beds: 7,
      last_review: new Date()
   }
];

const dotenv = require('dotenv');
dotenv.config();

async function main() {
      
   // const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@atlascluster.iqqnaol.mongodb.net/?retryWrites=true&w=majority`
   console.log(process.env.DB_URI);
   const uri = process.env.DB_URI;

   /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
   const client = new MongoClient(uri);

   try {
      await client.connect();
      console.log('DB connected!');
      await listDatabases(client);
      // await createListing(client, oneEntry);
      // await createMultipleListings(client, multipleEntries);
      await findOneListingByName(client, "Infinite Views");
      // await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
      //    minimumNumberOfBedrooms: 4,
      //    minimumNumberOfBathrooms: 2,
      //    maximumNumberOfResults: 5
      // });

   } catch (e) {
      console.error(e);
   } finally {
      await client.close();
   }
}


main().catch(console.error);


async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
   minimumNumberOfBedrooms = 0,
   minimumNumberOfBathrooms = 0,
   maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
   const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find(
                           {
                               bedrooms: { $gte: minimumNumberOfBedrooms },
                               bathrooms: { $gte: minimumNumberOfBathrooms }
                           }
                           ).sort({ last_review: -1 })
                           .limit(maximumNumberOfResults);

   const results = await cursor.toArray();

   if (results.length > 0) {
       console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
       results.forEach((result, i) => {
           date = new Date(result.last_review).toDateString();

           console.log();
           console.log(`${i + 1}. name: ${result.name}`);
           console.log(`   _id: ${result._id}`);
           console.log(`   bedrooms: ${result.bedrooms}`);
           console.log(`   bathrooms: ${result.bathrooms}`);
           console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
       });
   } else {
       console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
   }
}


async function findOneListingByName(client, nameOfListing) {
   const result = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: nameOfListing });

   if (result) {
       console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
       console.log(result);
   } else {
       console.log(`No listings found with the name '${nameOfListing}'`);
   }
}


async function listDatabases(client) {
   const databasesList = await client.db().admin().listDatabases();

   console.log("Databases:");
   databasesList.databases.forEach(db => {
      console.log(`- ${db.name}`);
   });
}


async function createListing(client, newListing) {
   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

   console.log(`New listing created with new ID: ${result.insertedId}`);
}


async function createMultipleListings(client, newListing) {
   const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListing);

   console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
   console.log(result.insertedIds);  
}
