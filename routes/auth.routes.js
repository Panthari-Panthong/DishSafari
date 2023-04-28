const express = require("express");
const router = express.Router();

// Load the bcrypt module
const bcryptjs = require("bcryptjs");

//import User Schema
const User = require("../models/User.model");

// require auth middleware
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");

// Use RegEx To Test Password Strength
// must be matched 8 or more times
// need to match the special characters [@$!%*?&]
const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

/* GET signup page */
router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

// POST route ==> to process form data
router.post("/signup", isLoggedOut, async (req, res, next) => {
  try {
    // Find the username in DB if exists
    const findUserName = await User.findOne({ username: req.body.username });

    // If it not find the username in DB
    if (!findUserName) {
      // Uncomment out this line if you want to Test Password Strength
      // --------------- If Test Password Strength ---------------------- //
      //   if (pwdRegex.test(req.body.password)) {
      // --------------- End If Test Password Strength ---------------------- //
      // Generate a salt
      const salt = bcryptjs.genSaltSync(13);
      // Hash the password with the salt
      const passwordHash = bcryptjs.hashSync(req.body.password, salt);

      //Create user in the database with Hash password
      await User.create({
        username: req.body.username,
        password: passwordHash,
      });

      //Automatic redirect to login page
      res.redirect("/login");

      // If the password is not strong enough
      // Send back to signup page

      // Uncomment out this part if you want to Test Password Strength
      // --------------- Else Test Password Strength ---------------------- //
      //   } else {
      //     res.render("auth/signup", {
      //       errorMessage:
      //         "Password needs to have at least 8 chars and must contain at least one special characters, one lowercase and one uppercase letter.",
      //       username: req.body.username,
      //     });
      //   }
      // --------------- End Else Test Password Strength ----------------- //

      // ------------------- Else check username --------------------- //
      // If the username alredy use
      // Send back to signup page
    } else {
      res.render("auth/signup", {
        errorMessage: "Username already in use",
        username: req.body.username,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Login
// GET route ==> to display the login form to users
router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

// POST login route ==> to process form data
router.post("/login", isLoggedOut, async (req, res, next) => {
  try {
    // Find username in DB
    const user = await User.findOne({ username: req.body.username });

    /* Trying to check if user is not not false
    user = null
    !user => true
    !true => false
    !!user => false */
    if (!!user) {
      // Check If password is correct
      if (bcryptjs.compareSync(req.body.password, user.password)) {
        //******* SAVE THE USER IN THE SESSION ********//
        req.session.currentUser = user;
        res.redirect("/user/profile");
        // If password is wrong
        // Send back to login page
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }

      // If we don't have a user with the given username
    } else {
      res.render("auth/login", { errorMessage: "User does not exists" });
    }
  } catch (error) {
    next(error);
  }
});

//Logout
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
