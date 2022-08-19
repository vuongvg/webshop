const { db } = require("../database");
const { customError } = require("../errors/customError");
let time;
const checkConnectDbMdw = async (req, res, next) => {
   clearInterval(time);
   const time = setInterval(() => {
      console.log("DB: ", db);
   }, 5 * 60 * 1000);
   try {
      db.users || (await connectToDb(process.env.MONGODB_URI));
   } catch (error) {
      console.log(error);
      next(customError(503, "DB not reconnect"));
   }
   next();
};

module.exports = { checkConnectDbMdw };
