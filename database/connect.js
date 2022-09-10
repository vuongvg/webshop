const { default: mongoose } = require("mongoose");
const { Product } = require("../model/productModel");
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
