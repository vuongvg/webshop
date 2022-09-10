const { connectToDb } = require("../database/connect");
const { customError } = require("../errors/customError");
const  Product  = require("../model/productModel");

const checkConnectDbMdw = async (req, res, next) => {
   try {
      if (!Product.db.collections.users) {
         console.log("Not connect DB");
         await connectToDb();
      }
   } catch (error) {
      console.log(error);
      next(customError(500, "DB not reconnect"));
   }
   next();
};

module.exports = { checkConnectDbMdw };
