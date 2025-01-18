import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
	},
	isCorrect: {
		type: Boolean,
		required: true,
	},
});

const questionSchema = new mongoose.Schema({
	subtopicId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Subtopic",
		required: true,
		index: true,
	},
	questionName: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	option: {
		type: [optionSchema],
		required: true,
		validate: [arrayLimit, "{PATH} must have exactly 4 options"],
	},
	hint: {
		type: String,
	},

	createOn: {
		type: Date,
		default: Date.now,
	},
});

function arrayLimit(val) {
	return val.length === 4;
}

export default mongoose.model("Question", questionSchema);
