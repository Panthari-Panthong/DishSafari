const express = require("express");
const router = express.Router();

const BMI = require("../models/BMI.model");

router.get("/:userID", (req, res, next) => {
  res.render("user/bmi/bmiForm", {
    userInSession: req.session.currentUser,
  });
});

router.post("/:userID", async (req, res, next) => {
  try {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const bmi = weight / (height * height);
    let result = "";
    let resultPic = "";

    if (bmi < 18.5) {
      result = "Your BMI falls within the underweight range";
      resultPic = "underweight";
    } else if (bmi > 18.5 && bmi <= 24.9) {
      result = "Your BMI falls within the normal or healthy weight range";
      resultPic = "normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
      result = "Your BMI falls within the overweight range";
      resultPic = "overweight";
    } else {
      result = "Your BMI falls within the obese range";
      resultPic = "obese";
    }

    await BMI.create({
      user: req.params.userID,
      height,
      weight,
      bmi,
      result,
      resultPic,
    });

    res.redirect("/user/profile");
  } catch (error) {
    next(error);
  }
});

// ---------------- Start Edit --------------------
router.get("/:userID/edit", async (req, res, next) => {
  try {
    const bmi = await BMI.find({
      user: req.session.currentUser,
    });
    res.render("user/bmi/bmiEdit", {
      userInSession: req.session.currentUser,
      bmi: bmi[0],
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:userID/edit", async (req, res, next) => {
  try {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const bmi = weight / (height * height);
    let result = "";
    let resultPic = "";

    if (bmi < 18.5) {
      result = "Your BMI falls within the underweight range";
      resultPic = "underweight";
    } else if (bmi > 18.5 && bmi <= 24.9) {
      result = "Your BMI falls within the normal or healthy weight range";
      resultPic = "normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
      result = "Your BMI falls within the overweight range";
      resultPic = "overweight";
    } else {
      result = "Your BMI falls within the obese range";
      resultPic = "obese";
    }
    const filter = { user: req.session.currentUser };
    const update = {
      user: req.session.currentUser,
      height,
      weight,
      bmi,
      result,
      resultPic,
    };

    await BMI.findOneAndUpdate(filter, update);

    res.redirect("/user/profile");
  } catch (error) {
    next(error);
  }
});

// ---------------- End Edit --------------------

module.exports = router;
