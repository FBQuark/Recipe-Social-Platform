import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId, // PK for UserSchema of recipe creator
  recipe_name: String,
  instructions: String,
  date_created: mongoose.Schema.Types.Date,
  cuisine_type: String,
  preparation_time: Number,
  cooking_time: Number,  
  saves: Number,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe