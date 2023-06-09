const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    recipe: {
      type: [Schema.Types.ObjectId],
      ref: "Recipe",
    },
    comment: {
      type: String,
      required: true,
    },
    rating: { type: Number, required: true },
    createdBy: {
      type: String,
      required: true,
    },
    created: { type: Date, default: Date.now },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
