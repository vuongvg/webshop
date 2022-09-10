const { default: mongoose } = require("mongoose");

const categoriesSchema = new mongoose.Schema({
   name: String,
   slug: String,
   image: String,
   categories: Array,
});

const Categories = new mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
