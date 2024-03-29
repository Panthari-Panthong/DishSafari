// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);
// use session here:                 V
require('./config/session.config')(app);

// default value for title local
const capitalize = require('./utils/capitalize');
const projectName = 'DishSafari';

app.locals.appTitle = `${projectName}`;

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

// Auth route (signup , login, logout)
const authRoute = require('./routes/auth.routes');
app.use('/', authRoute);

// User route (profile , createRecipe , editRecipe, deleteRecipe)
const userRoute = require('./routes/user.routes');
app.use('/user', userRoute);

// Recipe route (allRecipes, oneRecipe, randomRecipe)
const recipeRoutes = require('./routes/recipes.routes');
app.use('/recipes', recipeRoutes);

const reviewRoute = require('./routes/review.routes');
app.use('/', reviewRoute);

// BMI
const bmiRoute = require('./routes/bmi.routes');
app.use('/bmi', bmiRoute);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
