import {
	findQuestionById,
	findAllQuestionsBySubtopicId,
	createNewQuestion,
	updateQuestion,
	deleteQuestion,
} from "../services/questionService.js";

export const getQuestionById = async (req, res) => {
	try {
		const question = await findQuestionById(req.params.id);
		res.status(200).json({
			message: "Question retrieved successfully",
			data: question,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to retrieve question",
			error: error.message,
		});
	}
};

export const getAllQuestionsBySubtopicId = async (req, res) => {
	try {
		const questions = await findAllQuestionsBySubtopicId(req.params.subtopicId);
		res.status(200).json({
			message: "Questions retrieved successfully",
			data: questions,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to retrieve questions",
			error: error.message,
		});
	}
};

export const createQuestion = async (req, res) => {
	try {
		const { subtopicId, questionName, image, option, hint, createOn } =
			req.body;
		const question = await createNewQuestion({
			subtopicId,
			questionName,
			image,
			option,
			hint,
			createOn, // ส่ง createOn ไปยัง service
		});
		res.status(201).json({
			// เปลี่ยน status เป็น 201 สำหรับการสร้างใหม่
			message: "Question created successfully",
			data: question,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to create question",
			error: error.message,
		});
	}
};

export const updateQuestionById = async (req, res) => {
	try {
		const question = await updateQuestion(req.params.id, req.body);
		res.status(200).json({
			message: "Question updated successfully",
			data: question,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to update question",
			error: error.message,
		});
	}
};

export const deleteQuestionById = async (req, res) => {
	try {
		await deleteQuestion(req.params.id);
		res.status(200).json({
			message: "Question deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to delete question",
			error: error.message,
		});
	}
};
