import {
	getTopScoreService,
	getAllScoreService,
	getScoreByIdService,
	getScoreByUserIdService,
	createScoreService,
	deleteScoreService,
	updateScoreService,
} from "../services/scoreService.js";
import { BadRequestError, NotFoundError } from "../utils/error.js";

export const getTopScore = async (req, res, next) => {
	try {
		const { subtopicId } = req.params;
		const TopScore = await getTopScoreService(subtopicId);

		res.status(200).json({
			message: "get top 10 scores success",
			data: TopScore,
		});
	} catch (error) {
		next(error);
	}
};

export const getAllScore = async (req, res, next) => {
	try {
		const allScore = await getAllScoreService();

		res.status(200).json({
			message: "get all score success",
			data: allScore,
		});
	} catch (error) {
		next(error);
	}
};

export const createScore = async (req, res, next) => {
	try {
		const { userId, subtopicId, score, timeSpent } = req.body;
		if (!userId || !subtopicId || !score || !timeSpent) {
			throw new BadRequestError("All field is require");
		}

		const userScore = await getScoreByUserIdService(userId, subtopicId);

		if (userScore) {
			if (parseInt(score) > parseInt(userScore.score)) {
				const newScore = await updateScoreService(
					userScore._id,
					score,
					timeSpent
				);

				res.status(201).json({
					message: "Update score success",
					data: newScore,
				});
			} else {
				res.status(200).json({
					message: "New score is not higher than the existing score",
				});
			}
		} else {
			const data = { userId, subtopicId, score, timeSpent };
			const newScore = await createScoreService(data);

			res.status(201).json({
				message: "Create score success",
				data: newScore,
			});
		}
	} catch (error) {
		next(error);
	}
};

export const updateScore = async (req, res) => {
	try {
		const { scoreId } = req.params;
		const { score } = req.body;

		console.log(
			`Attempting to update score. ScoreId: ${scoreId}, New score: ${score}`
		);

		const updatedScore = await updateScoreService(scoreId, score);

		if (!updatedScore) {
			console.log(`Score not found. ScoreId: ${scoreId}`);
			return res.status(404).json({ message: "Score not found" });
		}

		console.log(
			`Score updated successfully. ScoreId: ${scoreId}, New score: ${updatedScore.score}`
		);
		res.json(updatedScore);
	} catch (error) {
		console.error("Error in updateScore:", error);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

export const deleteScore = async (req, res, next) => {
	try {
		const { scoreId } = req.params;

		const score = await getScoreByIdService(scoreId);
		if (!score) {
			throw new NotFoundError(`score with id ${scoreId} is not found`);
		}

		await deleteScoreService(scoreId);

		res.status(200).json({
			message: `delete score id ${scoreId} success`,
		});
	} catch (error) {
		next(error);
	}
};
