const mongoose = require("mongoose");

const Recipe = require("../models/Recipe.model");

const data = require("../data.json");

require("../db/index");

const insertData = async () => {
  try {
    await Recipe.insertMany(data);
    mongoose.connection.close();
  } catch (error) {
    mongoose.connection.close();
    console.log("ERROR", error);
  }
};

insertData();
