const { db } = require("../database");
const { customError } = require("../errors/customError");

const checkConnectDbMdw = async (req, res, next) => {
   try {
    //   db.users || (await connectToDb(process.env.MONGODB_URI));
   } catch (error) {
      console.log(error);
      next(customError(503, "DB not reconnect"));
   }
   next();
};

module.exports = { checkConnectDbMdw };