import App from "../App.js";
import User from "../schemas/account/User.js";
import Recipe from "../schemas/recipe/Recipe.js";
import RecipeIngredient from "../schemas/recipe/RecipeIngredient.js";
import RecipeRating from "../schemas/recipe/RecipeRating.js";
import Ingredient from "../schemas/recipe/Ingredient.js";

// requires just the recipe's id in the body as `recipe_id`
App.post('/GetRecipe', async(req, res) => {
  console.log(`Grabbing recipe: ${req.body.recipe_id}`);
  try {
    const recipe = await Recipe.findOne({_id: req.body.recipe_id});

    if(!recipe) {
      console.log(`Recipe by id: ${req.body.recipe_id} does not exist!`);
      res.status(400).send({message: "Incorrect recipe ID"});
    }

    const creator = await User.findOne({_id: recipe.user_id});
    const ingredients = await RecipeIngredient.find({recipe_id: req.body.recipe_id});
    const ratings = await RecipeRating.find({recipe_id: req.body.recipe_id});
    let sanitizedIngredients = [];
    let sanitizedRatings = [];
    let addedRatings = 0;
    let numberOfRatings = 0;

    for (const ingredient of ingredients) {
      const actualIngredient = await Ingredient.findOne({_id: ingredient.ingredient_id})
      sanitizedIngredients.push({
        ingredient: {id: ingredient.ingredient_id, name: actualIngredient.ingredient_name},
        measurement_type: actualIngredient.measurement_type,
        quantity: ingredient.quantity
      })
    }

    for (const rating of ratings) {
      const actualUser = await User.findOne({_id: rating.user_id});
      sanitizedRatings.push({
        creator: {id: rating.user_id, username: actualUser.username},
        date_created: rating.date_created,
        rating: rating.rating,
        comment: rating.comment
      })
      addedRatings += rating.rating;
      numberOfRatings++;
    }

    const response = {
      creator: {id: recipe.user_id, username: creator.username},
      recipe_name: recipe.recipe_name,
      instructions: recipe.instructions,
      date_created: recipe.date_created,
      cuisine_type: recipe.cuisine_type,
      preparation_time: recipe.preparation_time,
      cooking_time: recipe.cooking_time,
      ingredients: sanitizedIngredients,
      ratings: sanitizedRatings,
      averageRating: addedRatings/numberOfRatings
    }
    res.send(response);
  } catch(err) {
    console.log(`Error during grabbing recipe: ${err}`);
    res.status(500).send(err);
  }
});