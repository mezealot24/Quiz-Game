import Topic from "../models/Topic.js";

export const findTopicById = async (id) => {
	return await Topic.findById(id);
};

export const findAllTopics = async () => {
	return await Topic.find({
		_id: { $ne: "66f3e854b4bc1daba5211ca3" },
		topicName: { $ne: "เกมคณิตคิดเร็ว" },
	});
};

export const createNewTopic = async ({ category, topicName }) => {
	const newTopic = new Topic({
		category,
		topicName,
	});

	await newTopic.save();

	return newTopic;
};

export const updateTopic = async (id, updateData) => {
	return await Topic.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteTopic = async (id) => {
	return await Topic.findByIdAndDelete(id);
};
