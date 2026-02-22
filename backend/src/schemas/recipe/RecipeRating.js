import mongoose from "mongoose";

const RecipeRatingSchema = new mongoose.Schema({
  recipe_id: mongoose.Schema.Types.ObjectId, // PK for RecipeSchema of recipe
  user_id: mongoose.Schema.Types.ObjectId, // PK for UserSchema of reviewer
  date_created: mongoose.Schema.Types.Date,
  rating: Number, // from 1-5
  comment: String
});

const RecipeRating = mongoose.model("RecipeRating", RecipeRatingSchema);

export default RecipeRating