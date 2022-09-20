const User = require("../model/userModel");

const findUserById = async (_id) => {
   return await User.findById({ _id });
};

const updateWishListUser = async (_id, data) => {
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

const updateCartListUser = async (_id, cartList) => {
   return await User.updateOne(
      {
         _id,
      },
      cartList
   );
};

const updateAddressListUser = async (_id, addressList) => {
   return await User.updateOne(
      {
         _id,
      },
      addressList
   );
};

module.exports = { findUserById, updateWishListUser, updateCartListUser, updateAddressListUser };
