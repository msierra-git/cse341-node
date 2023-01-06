const mongodb = require("../db/connectdb");

const sinlgeContact = {
   firstName: "Jake",
   lastName: "Sierra",
   email: "jake.sierra@email.com",
   favoriteColor: "Black",
   birthday: new Date("1976-12-25")
};

const multipleContacts = [
   {
      firstName: "Tasmin",
      lastName: "Sierra",
      email: "tasmin.sierra@email.com",
      favoriteColor: "Green",
      birthday: new Date("1975-04-01")
   },
   {
      firstName: "Anneliese",
      lastName: "Sierra",
      email: "anneliese.sierra@email.com",
      favoriteColor: "Purple",
      birthday: new Date("1980-05-02")
   },
   {
      firstName: "Aurora",
      lastName: "Sierra",
      email: "aurora.sierra@email.com",
      favoriteColor: "Blue",
      birthday: new Date("1950-06-03")
   },
];


async function listDatabases() {
   const databasesList = await mongodb.getDb().db().admin().listDatabases();

   console.log("Databases:");
   databasesList.databases.forEach((db) => {
      console.log(`- ${db.name}`);
   });
}


async function createContact(newContact) {
   const result = await mongodb
      .getDb()
      .db('cse341_projects')
      .collection('contacts')
      .insertOne(newContact);

   console.log(`New contact created with new ID: ${result.insertedId}`);
}

async function createMultipleContacts(newContact) {
   const result = await mongodb
      .getDb()
      .db('cse341_projects')
      .collection('contacts')
      .insertMany(newContact);

   console.log(
      `${result.insertedCount} new contact(s) created with the following id(s):`
   );
   console.log(result.insertedIds);
}


mongodb.initDb((err, mongodb) => {
   if (err) {
      console.log(err);
   } else {
      console.log("All good!");
      // listDatabases();
      // createContact(sinlgeContact);
      createMultipleContacts(multipleContacts);
   }
});
