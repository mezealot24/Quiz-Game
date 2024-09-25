import { User } from "@/types/user";
import axiosInstance from "./axiosInstance";

export async function getUserById(userId: string): Promise<User | undefined> {
	try {
		const response = await axiosInstance.get(`/users/${userId}`);
		return response.data.data;
	} catch (error) {
		console.log(`Failed to get user with id ${userId}:`, error);
		return undefined;
	}
}

export async function updateUserById(
	userId: string,
	userData: User
): Promise<string> {
	try {
		await axiosInstance.patch(`/users/${userId}`, userData);
		return "แก้ไขข้อมูลผู้ใช้สำเร็จ";
	} catch (error) {
		console.log(`Failed to update user with id ${userId}:`, error);
		throw error;
	}
}
