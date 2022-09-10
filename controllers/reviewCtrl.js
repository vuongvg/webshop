const Reviews = require("../model/reviewsModel");

const insertReview = async (data) => {
   return await Reviews.insertMany(data);
};

const findReviewBySlugProduct = async (slug) => {
   return await Reviews.find({ product_slug: slug });
};

const findAllReviews = async () => {
   return await Reviews.find({}).limit(20);
};

module.exports = { insertReview, findAllReviews, findReviewBySlugProduct };
