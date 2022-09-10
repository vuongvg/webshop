const  Product  = require("../model/productModel");

const findProductsHint = async (keysearch) => {
   const products = await Product.aggregate([
      ...keysearch.split("_").map((key) => ({
         $match: {
            tags: {
               $regex: key,
            },
         },
      })),
      {
         $project: {
            name: 1,
            front_image: 1,
            price: 1,
            rating: 1,
            slug:1,
         },
      },
      {
        $limit:4
      }
   ])
   return products;
};
module.exports = { findProductsHint };
