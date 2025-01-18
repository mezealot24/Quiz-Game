import Question from "../models/Question.js";

export const findQuestionById = async (id) => {
	return await Question.findById(id).populate("subtopicId");
};

export const findAllQuestionsBySubtopicId = async (subtopicId) => {
	return await Question.find({ subtopicId })
		.populate("subtopicId", "name")
		.lean()
		.exec(); // เพิ่ม .exec() เพื่อให้แน่ใจว่า query ถูก execute
};

export const createNewQuestion = async ({
	subtopicId,
	questionName,
	image,
	option,
	hint,
	createOn, // เพิ่ม createOn ในพารามิเตอร์
}) => {
	const newQuestion = new Question({
		subtopicId,
		questionName,
		image,
		option,
		hint,
		createOn: createOn || new Date(), // ใช้ค่า createOn ที่ส่งมา หรือสร้างใหม่ถ้าไม่มี
	});

	await newQuestion.save();

	return newQuestion;
};

export const updateQuestion = async (id, updateData) => {
	updateData.createOn = new Date(); // อัปเดต createOn ทุกครั้งที่มีการแก้ไข
	return await Question.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteQuestion = async (id) => {
	return await Question.findByIdAndDelete(id);
};
