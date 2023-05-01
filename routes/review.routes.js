const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe.model");
const Review = require("../models/Review.model");

/* GET oneRecipe page */
router.get("/recipes/:recipeId/reviews/create", (req, res, next) => {
  res.render("recipe/partials/reviewForm", {
    userInSession: req.session.currentUser,
    recipeId: req.params.recipeId,
  });
});

router.post("/recipes/:recipeId/reviews/create", async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findById(recipeId);

    const { comment, rating, createdBy } = req.body;

    await Review.create({ recipe, comment, rating, createdBy });
    res.redirect(`/recipes/${recipeId}`);
  } catch (error) {
    if (error.code === 11000) {
      console.log("duplicate comments");
      return { message: "saved comments but with errors" };
    } else {
      next(error);
    }
  }
});

module.exports = router;
