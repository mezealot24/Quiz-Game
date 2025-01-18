import {
	findSubtopicById,
	findAllSubtopicsByTopicId,
	createNewSubtopic,
	updateSubtopic,
	deleteSubtopic,
} from "../services/subtopicService.js";

export const getSubtopicById = async (req, res) => {
	try {
		const subtopic = await findSubtopicById(req.params.id);
		res.status(200).json({
			message: "Subtopic retrieved successfully",
			data: subtopic,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to retrieve subtopic",
			error: error.message,
		});
	}
};

export const getAllSubtopicsByTopicId = async (req, res) => {
	try {
		const subtopics = await findAllSubtopicsByTopicId(req.params.topicId);
		res.status(200).json({
			message: "Subtopics retrieved successfully",
			data: subtopics,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to retrieve subtopics",
			error: error.message,
		});
	}
};

export const createSubtopic = async (req, res) => {
	try {
		const { topicId, subtopicName, time } = req.body;

		// Validate required fields
		if (!topicId || !subtopicName || time === undefined) {
			return res.status(400).json({
				message: "Missing required fields",
				error: "topicId, subtopicName, and time are required",
			});
		}

		// Validate data types
		if (
			typeof subtopicName !== "string" ||
			typeof time !== "number" ||
			isNaN(time)
		) {
			return res.status(400).json({
				message: "Invalid data types",
				error: "subtopicName should be a string, time should be a number",
			});
		}

		// Create the subtopic
		const subtopic = await createNewSubtopic({ topicId, subtopicName, time });

		res.status(201).json({
			message: "Subtopic created successfully",
			data: subtopic,
		});
	} catch (error) {
		console.error("Error creating subtopic:", error);
		res.status(500).json({
			message: "Failed to create subtopic",
			error: error.message,
		});
	}
};

export const updateSubtopicById = async (req, res) => {
	try {
		const subtopic = await updateSubtopic(req.params.id, req.body);
		res.status(200).json({
			message: "Subtopic updated successfully",
			data: subtopic,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to update subtopic",
			error: error.message,
		});
	}
};

export const deleteSubtopicById = async (req, res) => {
	try {
		await deleteSubtopic(req.params.id);
		res.status(200).json({
			message: "Subtopic deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to delete subtopic",
			error: error.message,
		});
	}
};
