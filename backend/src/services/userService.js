import User from "../models/User.js";
import { NotFoundError } from "../utils/error.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { sign } from "../utils/token.js";

export const registerUser = async ({ profile, name, username, password }) => {
	const existingUser = await User.findOne({ username });

	if (existingUser) {
		throw new Error("User already exists");
	}

	const hashedPassword = await hashPassword(password);

	const newUser = new User({
		profile,
		name,
		username,
		password: hashedPassword,
	});

	await newUser.save();

	const token = sign({
		id: newUser._id,
		username: newUser.username,
		name: newUser.name,
		profile: newUser.profile,
		isAdmin: newUser.isAdmin,
	});

	return { token, user: newUser };
};

export const loginUser = async ({ username, password }) => {
	const user = await User.findOne({ username });

	if (!user) {
		throw new Error("Invalid credentials");
	}

	const isMatch = await comparePassword(password, user.password);

	if (!isMatch) {
		throw new Error("Invalid credentials");
	}

	// If everything is okay, generate the token
	const token = sign({
		id: user._id,
		username: user.username,
		name: user.name,
		profile: user.profile,
		isAdmin: user.isAdmin,
	});

	return { token, user };
};

export const updateUser = async (id, data) => {
	const user = await User.findById(id);

	if (!user) {
		throw new Error("User not found");
	}

	return User.findByIdAndUpdate(id, data, { new: true });
};

export const setUserAdmin = async (id, isAdmin) => {
	const user = await User.findById(id);

	if (!user) {
		throw new Error("User not found");
	}

	return User.findByIdAndUpdate(id, { isAdmin }, { new: true });
};

export const removeUser = async (id) => {
	const user = await User.findByIdAndDelete(id);

	if (!user) {
		throw new Error("User not found");
	}

	return;
};

export const fetchAllUsers = async () => {
	const users = await User.find({});
	return users;
};

export const fetchUserById = async (id) => {
	const user = await User.findById(id);
	if (!user) {
		throw new NotFoundError("User not found");
	}

	user.password = "";
	return user;
};
