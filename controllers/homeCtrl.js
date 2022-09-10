const Product = require("../model/productModel");

const homeCtrl = async () => {
   const product_slider = await Product.aggregate([
      {
         $project: {
            _id: 1,
            back_image: 1,
            front_image: 1,
            categories: 1,
            date_create: 1,
            name: 1,
            slug: 1,
            on_sale: 1,
            discount: 1,
            price: 1,
            rating: 1,
            regular_price: 1,
            rating_count: 1,
            tags: 1,
         },
      },
   ]).limit(20);
   return { product_slider };
};

module.exports = { homeCtrl };
