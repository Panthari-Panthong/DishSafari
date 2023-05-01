const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe.model");

// Extra Reviews part
const Review = require("../models/Review.model");

//GET all the recipes
router.get("/", async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();
    res.render("recipe/allRecipes", { allRecipes });
  } catch (error) {
    console.error(error);
  }
});

//GET one recipe
router.get("/:recipeId", async (req, res, next) => {
  try {
    const onlyOneRecipe = await Recipe.findById(req.params.recipeId);

    // ----------  Extra Reviews part
    const reviews = await Review.find({ recipe: req.params.recipeId }).populate(
      "recipe"
    );

    res.render("recipe/oneRecipe", {
      onlyOneRecipe,
      reviews,
      recipeId: req.params.recipeId,
    });
  } catch (error) {
    console.error(error);
  }
});

//GET random recipe
router.get("/recipe/randomRecipe", async (req, res, next) => {
  try {
    const oneRandomRecipe = await Recipe.find();
    const randomRecipeLength = oneRandomRecipe.length;
    const randomRecipeIndex = Math.floor(Math.random() * randomRecipeLength);
    const randomRecipe = oneRandomRecipe[randomRecipeIndex];
    res.render("recipe/randomRecipe", { randomRecipe });
  } catch (error) {
    console.error(error);
  }
});

//GET random recipe
/* router.get('/randomRecipe', (req, res) => {
    data.getRandom()
    .then((randomRecipe) => {
      console.log(randomRecipe)
      res.render('randomRecipe', {randomRecipe})
    })
    .catch((error) => {
      console.error(error)
    })
}) */

module.exports = router;
