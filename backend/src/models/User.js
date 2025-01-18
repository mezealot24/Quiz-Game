import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	profile: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	createOn: {
		type: Date,
		default: new Date().getTime(),
	},
});

export default mongoose.model("User", userSchema);
