const { MongoClient } = require("mongodb");

const dbName = "webshop";
const db = {};
const connectToDb = async (URI) => {
   const mongodbClient = new MongoClient(URI, { monitorCommands: true });
   await mongodbClient.connect();
   console.log("DB Connected");
   const database = mongodbClient.db(dbName);
   db.users = database.collection("users");
   db.products = database.collection("products");
   setInterval(() => {
      console.log("DB: ", db);
   }, 5 * 60 * 1000);
};
module.exports = { db, connectToDb };
