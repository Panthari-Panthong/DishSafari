const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe.model");

const data = require("../data.json");

//GET all the recipes
router.get("/", async (req, res, next) => {
  try {
    const createRecipes = await Recipe.insertMany(data);
    console.log(createRecipes)
    /* const allRecipes = await Recipe.create(); */
    res.render("recipe/allRecipes", { recipe: createRecipes });
  } catch (error) {
    console.error(error);
  }
});

//GET one recipe
router.get('/:recipeId', async (req, res) => {
    try {
      const oneRecipe = await Recipe.findById(req.params.recipeId)
      if (!oneRecipe) {
        res.redirect('/recipe')
      } else {
        res.render('recipe/oneRecipe', oneRecipe)
      }
    } catch (error) {
      console.log(error)
    }
  })

module.exports = router;
