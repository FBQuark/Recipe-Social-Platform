import mongoose from "mongoose";

const ReportedUserSchema = new mongoose.Schema({
  report_id: mongoose.Schema.Types.ObjectId, // PK for ReportSchema of attached report
  user_id: mongoose.Schema.Types.ObjectId // PK for UserSchema of reported user
});

const ReportedUser = mongoose.model("ReportedUser", ReportedUserSchema);

export default ReportedUser