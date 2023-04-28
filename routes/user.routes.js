const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");

// require auth middleware
const { isLoggedIn } = require("../middleware/route-guard");

// Profile
// GET route ==> to display the profile form to users
router.get("/profile", isLoggedIn, async (req, res, next) => {
  try {
    // Find the recipes that user created
    const allRecipes = await Recipe.find({
      createdBy: req.session.currentUser,
    });

    res.render("user/profile", {
      userInSession: req.session.currentUser,
      allRecipes,
    });
  } catch (error) {
    next(error);
  }
});

// Create Recipe
// GET route ==> to display the create form to user
router.get("/recipe/create", isLoggedIn, async (req, res, next) => {
  res.render("user/createRecipe", { userInSession: req.session.currentUser });
});

// POST create route ==> to process form data
router.post("/recipe/create", isLoggedIn, async (req, res, next) => {
  try {
    // ---------- Start Ingredients -------------------
    // Separator ingredients by (comma) , to an array
    // Before adding in DB
    const ingredients = req.body.ingredients;
    const splitIngredients = ingredients.split(",");

    // Removes whitespace from both ends of a string
    const newArringredient = splitIngredients.map((element) => {
      return element.trim();
    });

    // ---------- End Ingredients -------------------

    // ---------- Start Directions -------------------
    //Separator Direction by "Step" word to an array
    const directions = req.body.directions;
    const splitDirections = directions.split("Step");

    // Removes whitespace from both ends of a string
    const removesWhitespace = splitDirections.map((element) => {
      return element.trim();
    });

    //Remove empty string in the direction array
    const newArrDirection = removesWhitespace.filter((str) => {
      return str !== "";
    });
    // ---------- End Directions -------------------

    // -------- Create a recipe to DB --------------
    const newRecipe = {
      title: req.body.title,
      image: req.body.image,
      cookingTime: req.body.cookingTime,
      countryOfOrigin: req.body.countryOfOrigin,
      continent: req.body.continent,
      mealType: req.body.mealType,
      serves: req.body.serves,
      ingredients: newArringredient,
      directions: newArrDirection,
      recipeType: req.body.recipeType,
      createdBy: req.session.currentUser,
    };

    await Recipe.create(newRecipe);

    res.redirect("/user/profile");
  } catch (error) {
    next(error);
  }
});

// Get one recipe
router.get("/recipe/:recipeID", isLoggedIn, async (req, res, next) => {
  try {
    // console.log("ID", req.params.recipeID);
    const recipe = await Recipe.findById(req.params.recipeID);

    res.render("user/recipe", { recipe });
  } catch (error) {
    next("ERROR", error);
  }
});

// Edit||Update recipe
router.get("/recipe/:recipeID/edit", async (req, res, next) => {
  try {
    console.log("ID", req.params.recipeID);
    const recipe = await Recipe.findById(req.params.recipeID);

    res.render("user/editRecipe", { recipe });
  } catch (error) {
    next(error);
  }
});

//  Edit||Update recipe
router.post("/recipe/:recipeID/edit", isLoggedIn, async (req, res, next) => {
  try {
    // ---------- Start Ingredients -------------------
    // Separator ingredients by (comma) , to an array
    // Before adding in DB
    const ingredients = req.body.ingredients;
    const splitIngredients = ingredients.split(",");

    // Removes whitespace from both ends of a string
    const newArringredient = splitIngredients.map((element) => {
      return element.trim();
    });

    // ---------- End Ingredients -------------------

    // ---------- Start Directions -------------------
    //Separator Direction by "Step" word to an array
    const directions = req.body.directions;
    const splitDirections = directions.split("Step");

    // Removes whitespace from both ends of a string
    const removesWhitespace = splitDirections.map((element) => {
      return element.trim();
    });

    //Remove empty string in the direction array
    const newArrDirection = removesWhitespace.filter((str) => {
      return str !== "";
    });
    // ---------- End Directions -------------------

    // -------- Update a recipe to DB --------------
    const updateRecipe = {
      title: req.body.title,
      image: req.body.image,
      cookingTime: req.body.cookingTime,
      countryOfOrigin: req.body.countryOfOrigin,
      continent: req.body.continent,
      mealType: req.body.mealType,
      serves: req.body.serves,
      ingredients: newArringredient,
      directions: newArrDirection,
      recipeType: req.body.recipeType,
      createdBy: req.session.currentUser,
    };

    await Recipe.findByIdAndUpdate(req.params.recipeID, updateRecipe, {
      new: true,
    });

    res.redirect("/user/profile");
  } catch (error) {
    next("ERROR", error);
  }
});

//Delete recipe
router.post("/recipe/:recipeID/delete", isLoggedIn, async (req, res, next) => {
  try {
    //Find with ID and delete
    await Recipe.findByIdAndRemove(req.params.recipeID);
    res.redirect("/user/profile");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
