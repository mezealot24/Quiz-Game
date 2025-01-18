import express from "express";
import {
	register,
	login,
	updateUserbyUser,
	deleteUser,
	getAllUsers,
	updateUserbyAdmin,
	getUserById,
	setAdminStatus,
} from "../controllers/userController.js";
import authenticateUserMiddleware from "../middlewares/userAuthMiddleware.js";
import authenticateAdminMiddleware from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch(
	"/:id",
	authenticateUserMiddleware,
	updateUserbyUser,
	updateUserbyAdmin
);
router.patch("/:id/set-admin", authenticateAdminMiddleware, setAdminStatus);
router.delete("/:id", authenticateAdminMiddleware, deleteUser);
router.get("/", authenticateAdminMiddleware, getAllUsers);
router.get("/:id", authenticateUserMiddleware, getUserById);

export default router;
