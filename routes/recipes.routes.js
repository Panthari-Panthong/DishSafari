const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe.model");

const data = require("../data.json");

//GET all the recipes
router.get("/", async (req, res, next) => {
  try {
    await Recipe.deleteMany();

    await Recipe.insertMany(data);

    const allRecipes = await Recipe.find();
    res.render("recipe/allRecipes", { allRecipes });
  } catch (error) {
    console.error(error);
  }
});

//GET one recipe
router.get("/recipes/:recipeId", async (req, res, next) => {
  try {
    const onlyOneRecipe = await Recipe.findById(req.params.recipeId);
    if (!onlyOneRecipe) {
      res.redirect("/recipes");
    } else {
      res.render("recipe/oneRecipe", { onlyOneRecipe });
    }
  } catch (error) {
    console.error(error);
  }
});

//GET random recipe
router.get("/randomRecipe", async (req, res, next) => {
    try {
  const oneRandomRecipe = await Recipe.find();
  const randomRecipeLength = oneRandomRecipe.length;
  const randomRecipeIndex = Math.floor(Math.random() *randomRecipeLength)
  console.log("RANDOM", randomRecipeIndex)
  const randomRecipe = oneRandomRecipe[randomRecipeIndex];
  console.log("RANDOM", randomRecipe)
  res.render("recipe/randomRecipe", {randomRecipe});
  
} catch (error) {
    console.error(error);
} 
});

router.get("/oneRecipe", (req, res, next) => {
  res.render("recipe/oneRecipe");
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
