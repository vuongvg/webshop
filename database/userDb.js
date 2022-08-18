const { ObjectId } = require("mongodb");
const { db } = require(".");
const { customError } = require("../errors/customError");

const findUserByEmailDb = async (email) => {
   try {
      return await db.users.findOne({ email });
   } catch (error) {
      throw customError(503, "DB not connect");
   }
};

const findUserByIdDb = async (_id) => {
   try {
      return await db.users.findOne({ _id: ObjectId(_id) });
   } catch (error) {
      throw customError(503, "DB not connect");
   }
};

const findByAllUsers = async ({ per_page = 10, page = 1 }) => {
   try {
      const total_users = await db.users.countDocuments({});
      const list_users = await db.users
         .find({})
         .skip(+per_page * (+page - 1))
         .limit(+per_page)
         .toArray();
      return { total_users, list_users, per_page, page };
   } catch (error) {
      throw customError(503, "DB not connect");
   }
};

const insertUser = async (user) => {
   try {
      return await db.users.insertOne(user);
   } catch (error) {
      throw customError(503, "DB not connect");
   }
};

module.exports = { findUserByEmailDb, insertUser, findUserByIdDb, findByAllUsers };
