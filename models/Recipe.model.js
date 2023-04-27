const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    countryOfOrigin: {
      type: String,
      required: true,
    },
    continent: {
      type: String,
      enum: [
        "Asia",
        "Africa",
        "Australia",
        "Europe",
        "North America",
        "South America",
      ],
      required: true,
    },
    level: {
      type: String,
      enum: ["Novice", "Intermediate", "Advanced", "Expert"],
    },
    mealType: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
    },
    serves: {
      type: Number,
    },
    ingredients: {
      type: [String],
    },
    directions: {
      type: [String],
    },
    recipeType: {
      type: String,
      enum: ["Meat", "Fish", "Vegetarian", "Vegan"],
    },
    createdBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;
