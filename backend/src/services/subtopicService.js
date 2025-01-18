import Subtopic from "../models/Subtopic.js";

export const findSubtopicById = async (id) => {
	const subtopic = await Subtopic.findById(id).populate("topicId");
	if (subtopic && subtopic.topicId) {
		const { category, topicName } = subtopic.topicId;
		return {
			...subtopic.toObject(),
			topicId: subtopic.topicId._id,
			category,
			topicName,
		};
	}
	return subtopic;
};

export const findAllSubtopicsByTopicId = async (topicId) => {
	const subtopics = await Subtopic.find({ topicId }).populate("topicId");
	return subtopics.map((subtopic) => {
		if (subtopic.topicId) {
			const { category, topicName } = subtopic.topicId;
			return {
				...subtopic.toObject(),
				topicId: subtopic.topicId._id,
				category,
				topicName,
			};
		}
		return subtopic;
	});
};

export const createNewSubtopic = async ({ topicId, subtopicName, time }) => {
	const newSubtopic = new Subtopic({
		topicId,
		subtopicName,
		time,
	});

	try {
		await newSubtopic.save();

		return newSubtopic;
	} catch (error) {
		console.error("Error saving subtopic:", error);
		throw error;
	}
};

export const updateSubtopic = async (id, updateData) => {
	return await Subtopic.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteSubtopic = async (id) => {
	return await Subtopic.findByIdAndDelete(id);
};
