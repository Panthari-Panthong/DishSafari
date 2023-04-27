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

module.exports = router;
