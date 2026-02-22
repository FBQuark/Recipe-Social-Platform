import mongoose from "mongoose";

const SavedRecipeSchema = new mongoose.Schema({
  recipe_id: mongoose.Schema.Types.ObjectId, // PK for RecipeSchema of recipe
  user_id: mongoose.Schema.Types.ObjectId, // PK for UserSchema of saver
  date_created: mongoose.Schema.Types.Date
});

const SavedRecipe = mongoose.model("SavedRecipe", SavedRecipeSchema);

export default SavedRecipe