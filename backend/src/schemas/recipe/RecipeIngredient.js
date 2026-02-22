import mongoose from "mongoose";

const RecipeIngredientSchema = new mongoose.Schema({
  recipe_id: mongoose.Schema.Types.ObjectId, // PK for RecipeSchema of recipe
  ingredient_id: mongoose.Schema.Types.ObjectId, // PK for IngredientSchema
  quantity: Number
});

const RecipeIngredient = mongoose.model("RecipeIngredient", RecipeIngredientSchema);

export default RecipeIngredient