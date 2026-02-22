import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
  ingredient_name: String,
  measurement_type: String // liquid, solid, etc (like should we use grams or liters)
});

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

export default Ingredient