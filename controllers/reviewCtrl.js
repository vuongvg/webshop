const Reviews = require("../model/reviewsModel");

const createReview = async (data) => {
   return await Reviews.create(data);
};

const findReviewBySlugProduct = async (slug) => {
   return await Reviews.find({ product_slug: slug });
};

const findAllReviews = async () => {
   return await Reviews.find({}).limit(20);
};

module.exports = { createReview, findAllReviews, findReviewBySlugProduct };
