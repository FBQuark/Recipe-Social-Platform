import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password_hash: String,
  date_created: mongoose.Schema.Types.Date,
  status: String,
  measurement_system: String,
  filtered_ingredients: mongoose.Schema.Types.Array
});

const User = mongoose.model("User", UserSchema);

export default User;