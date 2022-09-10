// const { findOneProductBySlugDb, findAllProductsByQueryDb } = require("../database/productsDb");
const { convertNameToSlug } = require("../common/common");
const Product = require("../model/productModel");
const Reviews = require("../model/reviewsModel");

let time = 0;

const findOneProductBySlugDb = async (slug) => {
   const product = await Product.findOne({ slug: slug });
   const review = await Reviews.find({ product_slug: slug });
   return { product, per_page: 1, page: 1, total_products: 1, total_page: 1, review };
};

const updateProduct = async () => {};

const createProduct = async (data) => {
   const { front_image, back_image, color, brand, categories, images, name, price, regular_price } = data;
   const alt = `${name} ${brand.name} ${categories.map((category) => category.name).join(" ")}`;
   back_image.alt = alt;
   front_image.alt = alt;
   images.map((image) => (image.alt = alt));
   color.map((item) => (item.image.alt = alt + " " + item.name));
   color.map((item) => (item.slug = convertNameToSlug(item.name)));
   categories.map((category) => (category.slug = convertNameToSlug(category.name)));
   if (!regular_price) data.regular_price = data.price;
   data.tags = `${name}, ${brand.name}, ${categories.map((category) => category.name).join(", ")}, ${color
      .map((item) => item.name.match(/\w+/g).join(", "))
      .join(", ")}`.toLowerCase();
   brand.slug = convertNameToSlug(brand.name);
   data.discount = data.discount || 0;

   clearTimeout(time);
   time = setTimeout(() => {
      delete global[name];
   }, 1 * 60 * 1000);

   if (!global[name]) {
      const sameName = await Product.find({ name: name });
      !global[name] ? (global[name] = sameName.length) : 0;
   }
   data.slug = global[name] ? convertNameToSlug(name) + `-${global[name] + 1}` : convertNameToSlug(name);
   global[name]++;

   const createProduct = await Product.create(data);
   return createProduct;
};

// const createProduct = async (data) => {
//    const { front_image, back_image, color, brand, categories, images, name, price, regular_price } = data;
//    const alt = `${name} ${brand.name} ${categories.map((category) => category.name).join(" ")}`;
//    back_image.alt = alt;
//    front_image.alt = alt;
//    images.map((image) => (image.alt = alt));
//    color.map((item) => (item.image.alt = alt + " " + item.name));
//    color.map((item) => (item.slug = convertNameToSlug(item.name)));
//    categories.map((category) => (category.slug = convertNameToSlug(category.name)));
//    if (!regular_price) data.regular_price = data.price;
//    data.tags = `${name}, ${brand.name}, ${categories.map((category) => category.name).join(", ")}, ${color
//       .map((item) => item.name.match(/\w+/g).join(", "))
//       .join(", ")}`.toLowerCase();
//    brand.slug = convertNameToSlug(brand.name);
//    data.discount = data.discount || 0;

//    const sameName = await Product.find({ name: name });
//    data.slug = sameName.length ? convertNameToSlug(name) + `-${sameName.length + 1}` : convertNameToSlug(name);

//    const createProduct = await Product.create(data);
//    return createProduct;
// };

const findAllProductsByQueryDb = async (query) => {
   if (query.order === "desc") {
      query.order = -1;
   } else query.order = 1;
   if (query.orderby === "date" || !query.orderby) query.orderby = "date_created";
   if (!query.per_page) query.per_page = 20;
   if (query.per_page > 50) query.per_page = 50;
   if (!query.page) query.page = 1;

   const { slug, pa_color, pa_brand, pa_discount, pa_rating, range_price, keysearch, per_page, page, order, orderby } = query;
   const filter = {};

   if (slug) filter["categories.slug"] = { $in: slug.split(",") };
   if (pa_color) filter["color.slug"] = { $in: pa_color.split(",") };
   if (pa_brand) filter["brand.slug"] = { $in: pa_brand.split(",") };
   if (pa_discount) filter.discount = { $gte: +Math.min(...pa_discount.split(",")) };
   if (pa_rating) filter["$or"] = pa_rating.split(",").map((num) => ({ rating: { $gte: +num, $lt: +num + 1 } }));

   if (range_price) {
      const [min, max] = range_price.split(":");
      filter.price = { $gte: +min, $lte: +max };
   }

   const dataDb = await Product.aggregate([
      ...configSearchAndFilterToAggregate(filter, keysearch),
      ...configSortToAggregate(per_page, page, order, orderby),
   ]);

   const dataFilter = await filterSidebar(filter);
   const discount = listDiscountEdit(dataFilter[0].discount, pa_discount);
   const rating = listRatingEdit(dataFilter[0].rating, pa_rating);
   const brand = dataFilter[0].brand
      .map(({ _id, count }) => ({ count, slug: _id.slug, name: _id.name, checked: _id.slug === pa_brand }))
      .sort((a, b) => a.slug.localeCompare(b.slug));
   const color = dataFilter[0].color
      .map(({ _id, count }) => ({ count, slug: _id.slug, name: _id.name, checked: _id.slug === pa_color }))
      .sort((a, b) => a.slug.localeCompare(b.slug));
   const categories = dataFilter[0].categories
      .map(({ _id, count }) => ({ count, slug: _id.slug, name: _id.name, checked: _id.slug === slug }))
      .sort((a, b) => a.slug.localeCompare(b.slug));
   const price = { min: String(dataFilter[0].price[0].min), max: String(dataFilter[0].price[0].max) };
   if (range_price) {
      const [min, max] = range_price.split(":");
      price.minHandle = min;
      price.maxHandle = max;
   }
   const { list_products, total_products } = dataDb[0];
   const total_page = Math.ceil(total_products[0]?.count / per_page || 0);

   return {
      per_page,
      page,
      list_products,
      total_page,
      total_products: total_products[0]?.count || 0,
      filterSidebar: { brand, discount, color, categories, price, rating },
   };
};

const configSearchAndFilterToAggregate = (filter, key) => {
   if (key) {
      return [
         ...key.split("_").map((char) => ({
            $match: {
               key_search: {
                  $regex: char,
               },
            },
         })),
         {
            $match: filter,
         },
      ];
   } else {
      return [
         {
            $match: filter,
         },
      ];
   }
};

const configSortToAggregate = (per_page, page, order, orderby) => {
   return [
      {
         $set: {
            temp: 1,
         },
      },
      {
         $facet: {
            total_products: [{ $sortByCount: "$temp" }],
            list_products: [
               { $sort: { [orderby]: order } },
               { $skip: +per_page * (+page - 1) },
               { $limit: +per_page },
               {
                  $project: {
                     _id: 1,
                     back_image: 1,
                     front_image: 1,
                     short_description: 1,
                     color: 1,
                     brand: 1,
                     size: 1,
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
                     images: 1,
                     // _id: 0,
                     // key_search: 1,
                  },
               },
            ],
         },
      },
   ];
};

const filterSidebar = async (filter) => {
   const filterCategories = { ...filter };
   delete filterCategories["categories.slug"];
   const filterColor = { ...filter };
   delete filterColor["color.slug"];
   const filterBrand = { ...filter };
   delete filterBrand["brand.slug"];
   const filterDiscount = { ...filter };
   delete filterDiscount.discount;
   const filterRating = { ...filter };
   delete filterRating["$or"];
   const filterPrice = { ...filter };
   delete filterPrice.price;

   return await Product.aggregate([
      {
         $facet: {
            brand: [
               {
                  $match: filterBrand,
               },
               { $addFields: { document: "$$ROOT" } },
               { $sortByCount: "$brand" },
            ],
            color: [
               {
                  $match: filterColor,
               },
               { $unset: "color.image" },
               { $unwind: "$color" },
               { $sortByCount: "$color" },
            ],
            categories: [
               {
                  $match: filterCategories,
               },
               { $unwind: "$categories" },
               { $sortByCount: "$categories" },
            ],
            price: [
               {
                  $match: filterPrice,
               },
               { $group: { _id: null, max: { $max: "$price" }, min: { $min: "$price" } } },
            ],
            rating: [
               {
                  $match: filterRating,
               },
               { $sortByCount: "$rating" },
            ],
            discount: [
               {
                  $match: filterDiscount,
               },
               { $sortByCount: "$discount" },
            ],
         },
      },
   ]);
};

const listDiscountEdit = (dataFilter, pa_discount) =>
   [0, 10, 20, 30, 40, 50]
      .map((value, index) => {
         const listDiscountFilter = dataFilter
            .filter(
               ({ _id }) => _id >= value
               // & (_id - 10 < value)
            )
            .map(({ count }) => count);
         const totalCount = eval(listDiscountFilter.join("+"));
         return { name: `${value}% and above`, slug: String(value), count: totalCount, checked: +pa_discount === value };
      })
      .filter(({ count }) => count);

const listRatingEdit = (dataFilter, pa_rating) =>
   [0, 1, 2, 3, 4, 5]
      .map((value, index) => {
         const listRatingFilter = dataFilter.filter(({ _id }) => _id >= value && _id < value + 1).map(({ count }) => count);
         const totalCount = eval(listRatingFilter.join("+"));
         return { slug: String(value), name: String(value), count: totalCount, checked: +pa_rating === value };
      })
      .filter(({ count }) => count)
      .sort((a, b) => b.slug - a.slug);

module.exports = { findOneProductBySlugDb, findAllProductsByQueryDb, createProduct, updateProduct };
