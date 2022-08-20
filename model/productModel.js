const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
   front_image: {
      type: String,
      required: true,
   },
   back_image: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   color: {
      type: Array,
      required: true,
   },
   brand: {
      type: Object,
      required: true,
   },
   size: {
      type: Array,
      required: true,
   },
   categories: {
      type: Array,
      required: true,
   },
   dimensions: {
      type: Object,
      required: true,
   },
   images: {
      type: Array,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   list_variation: {
      type: Array,
      required: true,
   },
   featured: {
      type: Boolean,
      required: true,
   },
   on_sale: {
      type: Boolean,
      required: true,
   },
   discount: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   rating: {
      type: Number,
      required: true,
   },
   rating_count: {
      type: Number,
      required: true,
   },
   regular_price: {
      type: Number,
      required: true,
   },
   slug: {
      type: String,
      required: true,
   },
   sale_price: {
      type: Number,
      required: true,
   },
   stock_quantity: {
      type: Number,
      required: true,
   },
   tags: {
      type: String,
      required: true,
   },
});

const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
