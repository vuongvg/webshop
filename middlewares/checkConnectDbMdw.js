const { db } = require("../database");

const checkConnectDbMdw = async (req, res, next) => {
//    db.users || (await connectToDb(process.env.MONGODB_URI));
   next();
};

module.exports = { checkConnectDbMdw };
