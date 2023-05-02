const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe.model");

const data = require("../data.json");

//GET all the recipes
router.get("/", async (req, res, next) => {
  try {
    // await Recipe.deleteMany();

    // await Recipe.insertMany(data);

    const allRecipes = await Recipe.find();
    res.render("recipe/allRecipes", { allRecipes, isQuery: false, });
  } catch (error) {
    console.error(error);
  }
});

//GET one recipe
router.get("/:recipeId", async (req, res, next) => {
  try {
    const onlyOneRecipe = await Recipe.findById(req.params.recipeId);
    res.render("recipe/oneRecipe", { onlyOneRecipe });
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


//POST filter recipes

router.post('/recipe/filter', async (req, res) => {

  try {
    const filters = {};

    if (req.body.recipeType !== 'pleaseSelect') {
      filters.recipeType = req.body.recipeType;
    }

    if (req.body.mealType !== 'pleaseSelect') {
      filters.mealType = req.body.mealType;
    }

    if (req.body.level !== 'pleaseSelect') {
      filters.level = req.body.level;
    }

    if (req.body.continent !== 'pleaseSelect') {
      filters.continent = req.body.continent;
    }

    const filteredRecipes = await Recipe.find(filters);
    console.log(filteredRecipes);
    res.render('recipe/allRecipes', { filteredRecipes, isQuery: true });
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
