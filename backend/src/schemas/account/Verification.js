import e from "express";
import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema({
	user_id: mongoose.Schema.Types.ObjectId, // PK for UserSchema of attached user
	description: String,
	date_created: mongoose.Schema.Types.Date
});

const Verification = mongoose.model("Verification", VerificationSchema);

export default Verification;