// const { MongoClient } = require("mongodb");

const { default: mongoose } = require("mongoose");
const { Product } = require("../model/productModel");

// const dbName = "webshop";
// const db = {};
// const connectToDb = async (URI) => {
//    const mongodbClient = new MongoClient(URI);

//    // mongodbClient.on("serverHeartbeatStarted", (event) => {
//    //    console.log("serverHeartbeatStarted: ", event);
//    // });
//    // mongodbClient.on("serverHeartbeatSucceeded", (event) => {
//    //    console.log("serverHeartbeatSucceeded: ", );
//    // });
//    // mongodbClient.on("serverHeartbeatFailed", (event) => {
//    //    console.log("serverHeartbeatFailed: ", event);
//    // });

//    await mongodbClient.connect();
//    console.log("DB Connected");
//    const database = mongodbClient.db(dbName);
//    db.users = database.collection("users");
//    db.products = database.collection("products");
// };
// module.exports = { db, connectToDb };

const connectToDb = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Connect DB");
      // Product.db.collections.products.createIndex({key_search:1})
   } catch (error) {
      console.log(`* ERROR Connect DB: *`, error);
   }
};
module.exports = { connectToDb };
