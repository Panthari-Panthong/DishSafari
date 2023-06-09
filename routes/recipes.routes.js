const express = require("express");
const router = express.Router();

const Recipe = require("../models/Recipe.model");

// Extra Reviews part
const Review = require("../models/Review.model");

//
const User = require("../models/User.model");

//GET all the recipes
router.get("/", async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find();
    res.render("recipe/allRecipes", {
      allRecipes,
      isQuery: false,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    console.error(error);
  }
});

//GET one recipe
router.get("/:recipeId", async (req, res, next) => {
  try {
    const onlyOneRecipe = await Recipe.findById(req.params.recipeId);

    const userId = onlyOneRecipe.createdBy[0];
    const user = await User.findById(userId);
    let createdBy = ""

    if(user === null){
      createdBy = "DishSafari"
    }else{
      createdBy = user.username
    }

    // ----------  Extra Reviews part
    const reviews = await Review.find({ recipe: req.params.recipeId }).populate(
      "recipe"
    );

    res.render("recipe/oneRecipe", {
      onlyOneRecipe,
      createdBy,
      reviews,
      recipeId: req.params.recipeId,
      userInSession: req.session.currentUser,
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

    const userId = randomRecipe.createdBy[0];
    const user = await User.findById(userId);

    let createdBy = ""

    if(user === null){
      createdBy = "DishSafari"
    }else{
      createdBy = user.username
    }
    res.render("recipe/randomRecipe", {
      randomRecipe,
      userInSession: req.session.currentUser,
      createdBy
    });
  } catch (error) {
    console.error(error);
  }
});

router.get("/recipe/filter", async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.render("recipe/allRecipes", {
      allRecipes,
      isQuery: false,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    console.error(error);
  }
});

//POST filter recipes
router.post("/recipe/filter", async (req, res) => {
  try {
    const filters = {};

    if (req.body.recipeType !== "pleaseSelect") {
      filters.recipeType = req.body.recipeType;
    }

    if (req.body.mealType !== "pleaseSelect") {
      filters.mealType = req.body.mealType;
    }

    if (req.body.level !== "pleaseSelect") {
      filters.level = req.body.level;
    }

    if (req.body.continent !== "pleaseSelect") {
      filters.continent = req.body.continent;
    }

    const filteredRecipes = await Recipe.find(filters);
    // console.log(filteredRecipes);
    res.render("recipe/allRecipes", {
      filteredRecipes,
      isQuery: true,
      userInSession: req.session.currentUser,
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
