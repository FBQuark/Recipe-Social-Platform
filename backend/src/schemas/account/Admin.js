import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId, // PK for UserSchema
  moderation_tools: mongoose.Schema.Types.Array
});

const Admin = mongoose.model("Admin", AdminSchema);

export default Admin