const User = require("../model/userModel");

const findUserById = async (_id) => {
   return await User.findById({_id});
};

module.exports = { findUserById };
