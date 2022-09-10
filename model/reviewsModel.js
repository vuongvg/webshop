const { default: mongoose } = require("mongoose");

const reviewsSchema = new mongoose.Schema(
   {
      rating: {
         type: String,
         required: [true, "Rating is required"],
         trim: true,
      },
      review: {
         type: String,
         required: [true, "Review is required"],
         trim: true,
      },
      reviewer: {
         type: String,
         required: [true, "Reviewer is required"],
         trim: true,
      },
      reviewer_email: {
         type: String,
         required: [true, "Email is required"],
         trim: true,
      },
      product_slug: {
         type: String,
         required: [true, "Slug is required"],
         trim: true,
      },
   },
   { timestamps: true, versionKey: false }
);
const Reviews = new mongoose.model("Reviews", reviewsSchema);

module.exports = Reviews;
