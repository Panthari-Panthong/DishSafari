<h1>DishSafari</h1>

<h2>Description</h2>

<p>DishSafari is an application that allows the User to explore the culinary world for new recipes and new inspirations. The User can either set up an accout where they would be able to add, edit and delete their own recipes, or any visitor to the application can search in the database of recipes to get inspiration of what they would like to cook. For those who dont know what to cook there is the option of a "random recipe" which picks out a recipe completely at random.</p>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the recipes that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **user-profile** - As a user I want to see all my recipes that I have created and my BMI result.
- **recipes create** - As a user I want to create an recipes so for others to choose.
- **recipes edit** - As a user I want to edit all recipes that I have created.
- **BMI calculater** - As a user I want to be able to calculate my BMI.
- **recipes list** - As a user I want to see all the recipes so that I can choose which ones I want to cook.
- **recipe detail** - As a user I want to see the recipe details and reviews list of one recipe so that I can decide if I want to choose.
- **recipe random** - As a user(with and without an account) I want to see the random recipe details when I don't know what to cook.
- **recipe review** - As a user(with and without an account) I want to be able to comment to each recipe.

## Backlog

User profile:

- see my profile
- calculate BMI
- list of recipes created by the user
- create, edit, delete recipes
- filter part on the search
- upload recipes picture (file upload with cloudinary)

Recipes page:

- see all recipes
- multi filter part on the search
- random one recipe
- review recipe

## ROUTES:

Index ROUTE

- GET /
  - renders the homepage
    Auth ROUTE
- GET /signup
  - redirects to /user/profile if user logged in
  - renders the signup form
- POST /signup
  - redirects to /login after user signup
  - body:
    - username
    - password
- GET /login
  - redirects to /user/profile if user logged in
  - renders the login form
- POST /login
  - redirects to /user/profile if user logged in
  - body:
    - username
    - password
- GET /logout

  - redirects to /index if user logout

Recipes ROUTE

- GET /recipes
  - renders the recipes list
- GET /recipes/:recipeId
  - renders the recipe detail page
  - includes the reviews form and reviews list
- GET /recipes/recipe/randomRecipe
  - renders the random recipe detail page
- POST /recipes/recipe/filter
  - renders to /recipes with filter specific data

User ROUTE

- GET /user/profile
  - render recipes that created by user
  - render BMI result
  - render search query
- POST /user/recipe/search
  - render search query
  - retrieves the search results from the database
- GET /user/recipe/create
  - render user in section
  - redirect to /login if user not login
- POST /user/recipe/create
  - body:
    - title
    - image
    - continent
    - mealType
    - serves
    - ingredients
    - directions
    - recipeType
    - createdBy (user in session)
    - redirects to /user/profile
- GET /user/recipe/:recipeID
  - render recipe detail by recipeID
- GET /user/recipe/:recipeID/edit
  - rander recipe form with recipe detail
- POST /user/recipe/:recipeID/edit
  - redirect to /user/profile
  - update recipe by recipeID
- POST /user/recipe/:recipeID/delete
  - redirect to /user/profile after deleted
  - redirect to /user/recipe/:recipeID not delete

Review ROUTE

- GET /recipes/:recipeId/reviews/create
  - render user in session
- POST /recipes/:recipeId/reviews/create
  - body:
    - comment
    - rating
    - createdBy
  - redirect to /recipes/:recipeId

BMI ROUTE

- GET /bmi/:userID
  - render user in session
- POST /bmi/:userID
  - body:
    - height
    - weight
    - bmi
    - result
    - resultPic
  - redirect to /user/profile
- GET /bmi/:userID/edit
  - render userInSession
  - render form edit BMI
- POST /bmi/:userID/edit
  - body:
    - height
    - weight
    - bmi
    - result
    - resultPic
  - redirect to /user/profile

## Models

User model

```
username: String
password: String
```

Recipe model

```
title: String
image: String
cookingTime: Number
countryOfOrigin : String
continent: String
level: String
mealType: String
serves: String
ingredients: [String]
directions: [String]
recipeType: String
createdBy: [ObjectId<User>]
```

Review model

```
recipe: [ObjectId<Recipe>]
comment: String
rating: Number
createdBy: String
created: Date
```

BMI model

```
user: [ObjectId<User>]
height: Number
weight: Number
bmi: Number
result: String
resultPic: String
date : Date
```

## Links

### Trello

[Link to your trello board](https://trello.com/b/KN4weVK2/dishsafari)

### Git

The url to your repository and to your deployed project

[Repository Link](https://github.com/Panthari-Panthong/DishSafari)

[Deploy Link](https://dishsafari.adaptable.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1Hhk1PZXc1HE580NUeCHy_3IHgHR09jBpDfDbAxDmCYU/edit#slide=id.p)
