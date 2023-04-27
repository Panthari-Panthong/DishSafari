const express = require("express");
const router = express.Router();

// Profile
// GET route ==> to display the profile form to users
router.get("/profile", (req, res) => {
  res.render("user/profile", { userInSession: req.session.currentUser });
});

module.exports = router;