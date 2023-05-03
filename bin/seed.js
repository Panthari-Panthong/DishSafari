const mongoose = require("mongoose");

const Recipe = require("../models/Recipe.model");

const data = require("../data.json");

require("../db/index");



const insertData = async () => {
  try {
    let insertedRecipes = await Recipe.insertMany(data);
    console.log(insertedRecipes)
  } catch (error) {
    mongoose.connection.close();
    console.log("ERROR", error);
  } finally {
    mongoose.connection.close();
  }
};

insertData();
