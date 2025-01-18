import {
	registerUser,
	loginUser,
	updateUser,
	removeUser,
	fetchAllUsers,
	fetchUserById,
	setUserAdmin,
} from "../services/userService.js";
import { hashPassword } from "../utils/hash.js";

export const register = async (req, res, next) => {
	try {
		const { profile, name, username, password } = req.body;
		const data = await registerUser({ profile, name, username, password });
		res.status(201).json(data);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const data = await loginUser({ username, password });
		res.status(200).json(data);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const updateUserbyUser = async (req, res, next) => {
	try {
		const { user } = req;
		const { id } = req.params;

		if (user.isAdmin && user._id.toString() !== id) {
			next();
			return;
		}

		const { profile, name, password } = req.body;

		if (password) {
			const hashedPassword = await hashPassword(password);
			const data = { profile, name, password: hashedPassword };
			await updateUser(id, data);
		} else {
			const data = { profile, name };
			await updateUser(id, data);
		}

		res.status(200).json({
			message: "update user success",
		});
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const updateUserbyAdmin = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { name, isAdmin } = req.body;

		const data = { name };
		if (isAdmin !== undefined) {
			data.isAdmin = isAdmin;
		}

		const newUser = await updateUser(id, data);
		res.status(200).json(newUser);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const setAdminStatus = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { isAdmin } = req.body;

		const updatedUser = await setUserAdmin(id, isAdmin);
		res.status(200).json({
			message: `Admin status updated for user ${id}`,
			user: updatedUser,
		});
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const { id } = req.params;
		await removeUser(id);
		res.status(204).end();
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await fetchAllUsers();
		res.status(200).json(users);
	} catch (error) {
		res.status(400);
		next(error);
	}
};

export const getUserById = async (req, res, next) => {
	try {
		const { id } = req.params;

		const users = await fetchUserById(id);

		res.status(200).json({
			message: `get user with id ${id} success`,
			data: users,
		});
	} catch (error) {
		res.status(400);
		next(error);
	}
};
