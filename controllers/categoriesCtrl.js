const { query } = require("express");
const Categories = require("../model/categoriesModel");
const Product = require("../model/productModel");

const findAllCategories = async () => {
   // const data = await Categories.find({});
   // console.log(`  *** data`, data);
   // return data;
   // console.log(`  *** Product`, Product)
   const result = await Product.aggregate([
      {
         $sortByCount: "$categories",
         // $group: {
         //    _id: "$categories.slug",
         //    min: { $min: "$price" },
         // },
      },
   ]);
   const listCategories = [];
   result
      .map(({ _id }) => _id)
      .map((item) => {
         if (listCategories.map((category) => category.slug).includes(item[0].slug)) {
            const index = listCategories.map((category) => category.slug).indexOf(item[0].slug);
            listCategories[index].categories.push(item[1]);
         } else {
            listCategories.push({ name: item[0].name, slug: item[0].slug, categories: [item[1]] });
         }
      });

   const queryDb = {};
   listCategories.map((item) => {
      queryDb[item.slug] = [
         {
            $match: {
               "categories.slug": item.slug,
               $expr: {
                  $and: [
                     {
                        $ne: ["$front_image", "$back_image"],
                     },
                     {
                        $ne: ["$back_image.src", ""],
                     },
                  ],
               },
            },
         },

         {
            $sample: {
               size: 1,
            },
         },
      ];
   });
   const images = await Product.aggregate([
      {
         $facet: queryDb,
      },
   ]);

   listCategories.map((item, index) => {
      item.categories.sort((a, b) => (a.slug > b.slug ? 1 : b.slug > a.slug ? -1 : 0));
      // item.image = images[0][item.slug][0].front_image;
      item.image = images[0][item.slug][0].front_image;
   });
   return listCategories.sort((a, b) => (a.slug > b.slug ? 1 : b.slug > a.slug ? -1 : 0));
};

module.exports = { findAllCategories };
