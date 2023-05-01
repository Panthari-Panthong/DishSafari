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
    res.render("recipe/allRecipes", { allRecipes });
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


//GET filter recipes
/* router.get('/filter-recipes', async (req, res) => {
    try {
    const titleFromUser = await req.body.title
    await Recipe.find({title: titleFromUser})
    console.log({title: titleFromUser})

    const recipeTypeFromUser = await req.body.recipeType
    await Recipe.find({recipeType: recipeTypeFromUser})

    const mealTypeFromUser = await req.body.mealType
    await Recipe.find({mealType: mealTypeFromUser})

    const levelFromUser = await req.body.level
    await Recipe.find({level: levelFromUser})

    const continentFromUser = await req.body.continent
    await Recipe.find({continent: continentFromUser})

    const countryFromUser = await req.body.countryOfOrigin
    await Recipe.find({countryOfOrigin: countryFromUser})

    res.redirect('/recipes')
  } catch (error) {
    console.error(error);
  }
}) */
router.get('/filter-recipes', async (req, res) => {

  try {
    const recipeTypeFromUser = req.query.recipeType;
    const mealTypeFromUser = req.query.mealType;
    const levelFromUser = req.query.level;
    const continentFromUser = req.query.continent;

/*   const filteredRecipes = await Recipe.find({$or: [
    {
      recipeType: recipeTypeFromUser
    },
    {
      mealType: mealTypeFromUser
    },
    {
      level: levelFromUser
    },
    {
      continent: continentFromUser
    },
  ]}); */

  const filteredRecipes = await Recipe.find({
    recipeType: { $in: [recipeTypeFromUser] },
    mealType: { $in: [mealTypeFromUser] },
    level: {$in: [levelFromUser]},
    continent: {$in: [continentFromUser]}

  });
  res.render("recipe/allRecipes", { filteredRecipes });
} catch (error) {
  console.error(error);
}
})


module.exports = router;
