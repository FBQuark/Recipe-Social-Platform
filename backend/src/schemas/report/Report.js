import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId, // PK for UserSchema of reporter
  admin_id: mongoose.Schema.Types.ObjectId, // PK for AdminSchema of responding admin
  recipe_id: mongoose.Schema.Types.ObjectId, // PK for RecipeSchema of reported recipe
  date_created: mongoose.Schema.Types.Date,
  status: String,
  report_reason: String
});

const Report = mongoose.model("Report", ReportSchema);

export default Report