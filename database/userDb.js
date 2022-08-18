const { ObjectId } = require("mongodb");
const { db, connectToDb } = require(".");
const { catchErrorDB } = require("../errors/catchErrorDB");

const findUserByEmailDb = async (email) => {
   db.users || (await connectToDb());
   return await db.users.findOne({ email });
};

const findUserByIdDb = async (_id) => {
   db.users || (await connectToDb());
   return await db.users.findOne({ _id: ObjectId(_id) });
};

const findByAllUsers = async ({ per_page = 10, page = 1 }) => {
   db.users || (await connectToDb());
   const total_users = await db.users.countDocuments({});
   const list_users = await db.users
      .find({})
      .skip(+per_page * (+page - 1))
      .limit(+per_page)
      .toArray();
   return { total_users, list_users, per_page, page };
};

const insertUser = async (user) => {
   return await db.users.insertOne(user);
};

module.exports = { findUserByEmailDb, insertUser, findUserByIdDb, findByAllUsers };
