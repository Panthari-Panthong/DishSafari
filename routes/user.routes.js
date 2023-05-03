const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe.model");

const BMI = require("../models/BMI.model");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

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

    const bmiUser = await BMI.find({
      user: req.session.currentUser,
    });

    let bmi = 0;
    let result = "";
    let resultPic = "";
    if (bmiUser.length !== 0) {
      bmi = bmiUser[0].bmi;
      result = bmiUser[0].result;
      resultPic = bmiUser[0].resultPic;
    }

    res.render("user/profile", {
      userInSession: req.session.currentUser,
      allRecipes,
      isQuery: false,
      bmi,
      result,
      resultPic,
    });
  } catch (error) {
    next(error);
  }
});

// Handles the search query and retrieves the search results from the database
router.post("/recipe/search", isLoggedIn, async (req, res, next) => {
  try {
    const queryTitle = req.body.query;
    const queryRecipe = await Recipe.find({
      // $regex Selects documents where values match a specified regular expression.
      // $options: "i" Case insensitivity to match upper and lower cases.
      title: { $regex: queryTitle, $options: "i" },
    });

    res.render("user/profile", {
      userInSession: req.session.currentUser,
      queryRecipe,
      isQuery: true,
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
router.post(
  "/recipe/create",
  fileUploader.single("image"),
  isLoggedIn,
  async (req, res, next) => {
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
      const {
        title,
        cookingTime,
        countryOfOrigin,
        continent,
        mealType,
        serves,
        recipeType,
      } = req.body;

      let imageUrl;
      if (req.file) {
        imageUrl = req.file.path;
      } else {
        imageUrl =
          "https://res.cloudinary.com/dkzhxg8ci/image/upload/v1683125073/DishSafari/Defalt-recipePic_in2b7k.jpg";
      }

      await Recipe.create({
        title,
        image: imageUrl,
        cookingTime,
        countryOfOrigin,
        continent,
        mealType,
        serves,
        ingredients: newArringredient,
        directions: newArrDirection,
        recipeType,
        createdBy: req.session.currentUser,
      });

      res.redirect("/user/profile");
    } catch (error) {
      next(error);
    }
  }
);

// Get one recipe
router.get("/recipe/:recipeID", isLoggedIn, async (req, res, next) => {
  try {
    // console.log("ID", req.params.recipeID);
    const recipe = await Recipe.findById(req.params.recipeID);
    res.render("user/recipe", {
      userInSession: req.session.currentUser,
      recipe,
    });
  } catch (error) {
    next("ERROR", error);
  }
});

// Edit||Update recipe
router.get("/recipe/:recipeID/edit", isLoggedIn, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.recipeID);

    // "\r\n" line breaks for each ingredient in textarea
    const editIngredients = recipe.ingredients.map(
      (ingredient) => ingredient + "," + "\r\n"
    );

    // Removing commas from ingredients array
    const ingredients = editIngredients.join("");

    // Add "Step " in the beginning of each string
    // "\r\n" line breaks for each direction in textarea
    const editDirections = recipe.directions.map(
      (direction) => "Step " + direction + "\r\n"
    );

    // Removing commas from directions array
    const directions = editDirections.join("");

    res.render("user/editRecipe", {
      userInSession: req.session.currentUser,
      recipe,
      ingredients,
      directions,
    });
  } catch (error) {
    next(error);
  }
});

//  Edit||Update recipe
router.post(
  "/recipe/:recipeID/edit",
  fileUploader.single("image"),
  isLoggedIn,
  async (req, res, next) => {
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

      // remove the last comma from a string
      const newDirection = newArrDirection.map((direction) => {
        return direction.replace(/,*$/, "");
      });
      // ---------- End Directions -------------------

      // -------- Update a recipe to DB --------------
      const {
        title,
        existingImage,
        cookingTime,
        countryOfOrigin,
        continent,
        mealType,
        serves,
        recipeType,
      } = req.body;

      let imageUrl;
      if (req.file) {
        imageUrl = req.file.path;
      } else {
        imageUrl = existingImage;
      }

      await Recipe.findByIdAndUpdate(
        req.params.recipeID,
        {
          title,
          image: imageUrl,
          cookingTime,
          countryOfOrigin,
          continent,
          mealType,
          serves,
          ingredients: newArringredient,
          directions: newDirection,
          recipeType,
          createdBy: req.session.currentUser,
        },
        {
          new: true,
        }
      );

      res.redirect("/user/profile");
    } catch (error) {
      next("ERROR", error);
    }
  }
);

//Delete recipe
router.post("/recipe/:recipeID/delete", isLoggedIn, async (req, res, next) => {
  try {
    //Find with ID and delete
    if (req.body.confirmDelete === "true") {
      await Recipe.findByIdAndRemove(req.params.recipeID);
      res.redirect("/user/profile");
    } else {
      res.redirect(`/user/recipe/${req.params.recipeID}`);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
