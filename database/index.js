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
};
module.exports = { db, connectToDb };
