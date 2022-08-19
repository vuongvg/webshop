const { MongoClient } = require("mongodb");

const dbName = "webshop";
const db = {};
const connectToDb = async (URI) => {
   const mongodbClient = new MongoClient(URI);
   mongodbClient.on("serverHeartbeatStarted", (event) => {
      console.log("serverHeartbeatStarted: ", event);
   });
   mongodbClient.on("serverHeartbeatSucceeded", (event) => {
      console.log("serverHeartbeatSucceeded: ", event);
   });
   mongodbClient.on("serverHeartbeatFailed", (event) => {
      console.log("serverHeartbeatFailed: ", event);
   });
   await mongodbClient.connect();
   console.log("DB Connected");
   const database = mongodbClient.db(dbName);
   db.users = database.collection("users");
   db.products = database.collection("products");
};
module.exports = { db, connectToDb };
