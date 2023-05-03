const { Schema, model } = require("mongoose");

const BMISchema = new Schema({
  user: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  resultPic: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BMI = model("BMI", BMISchema);

module.exports = BMI;
