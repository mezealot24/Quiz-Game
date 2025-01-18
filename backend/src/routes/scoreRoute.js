import express from "express";
import {
	getTopScore,
	getAllScore,
	createScore,
	updateScore,
	deleteScore,
} from "../controllers/scoreController.js";
import authenticateUserMiddleware from "../middlewares/userAuthMiddleware.js";
import authenticateAdminMiddleware from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

// userAuthMiddleware
router.get("/top/:subtopicId", authenticateUserMiddleware, getTopScore);

// adminAuthMiddleware
router.get("/", authenticateAdminMiddleware, getAllScore);

// userAuthMiddleware
router.post("/", authenticateUserMiddleware, createScore);

// adminAuthMiddleware
router.patch("/:scoreId", authenticateAdminMiddleware, updateScore);

// adminAuthMiddleware
router.delete("/:scoreId", authenticateAdminMiddleware, deleteScore);

export default router;
