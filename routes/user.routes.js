const express = require("express");
const router = express.Router();

// Profile
// GET route ==> to display the profile form to users
router.get("/profile", async (req, res, next) => {
  try {
    res.render("user/profile", { userInSession: req.session.currentUser });
  } catch (error) {
    next(error);
  }
});

// Create Recipe
// GET route ==> to display the create form to user
router.get("/create", (req, res, next) => {
  res.render("user/createRecipe", { userInSession: req.session.currentUser });
});

// POST create route ==> to process form data
router.post("/create", (req, res, next) => {
  try {
    // ---------- Start Ingredients -------------------
    // Separator ingredients by (comma) , to an array
    // Before adding in DB
    const ingredients = req.body.ingredients;
    const splitIngredients = ingredients.split(",");

    // Removes whitespace from both ends of a string
    const ingredient = splitIngredients.map((element) => {
      return element.trim();
    });

    // ---------- Start Ingredients -------------------

    // ---------- Start Directions -------------------
    //Separator Direction by "Step" word to an array
    const directions = req.body.directions;
    const splitDirections = directions.split("Step");

    // Removes whitespace from both ends of a string
    const removesWhitespace = splitDirections.map((element) => {
      return element.trim();
    });

    //Remove empty string in the direction array
    const direction = removesWhitespace.filter((str) => {
      return str !== "";
    });
    // ---------- End Directions -------------------

    console.log("Name : ", req.session.currentUser.username);
    // console.log("BODY", req.body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
