import mongoose from "mongoose";

const ReportedRecipeSchema = new mongoose.Schema({
  report_id: mongoose.Schema.Types.ObjectId, // PK for ReportSchema of attached report
  recipe_id: mongoose.Schema.Types.ObjectId // PK for RecipeSchema of reported recipe
});

const ReportedRecipe = mongoose.model("ReportedRecipe", ReportedRecipeSchema);

export default ReportedRecipe