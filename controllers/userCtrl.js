const User = require("../model/userModel");

const findUserById = async (_id) => {
   return await User.findById({ _id });
};
const updateWishlistUser = async (_id, data) => {
   return await User.updateOne(
      {
         _id,
      },
      [
         {
            $set: {
               wishList: {
                  $cond: [
                     {
                        $in: [data, "$wishList"],
                     },
                     {
                        $setDifference: ["$wishList", [data]],
                     },
                     {
                        $concatArrays: [[data], "$wishList"],
                     },
                  ],
               },
            },
         },
      ]
   );
};

module.exports = { findUserById, updateWishlistUser };
