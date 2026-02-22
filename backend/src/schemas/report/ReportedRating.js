import mongoose from "mongoose";

const ReportedRatingSchema = new mongoose.Schema({
  report_id: mongoose.Schema.Types.ObjectId, // PK for ReportSchema of attached report
  rating_id: mongoose.Schema.Types.ObjectId // PK for RatingSchema of reported rating
});

const ReportedRating = mongoose.model("ReportedRating", ReportedRatingSchema);

export default ReportedRating