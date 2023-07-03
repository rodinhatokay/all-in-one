import api from "../api/api";
import { User } from "./user.types";

export const getCurrentUserApi = async (
	token?: string | null,
	signal?: AbortSignal,
) => {
	const headers = token
		? {
				Authorization: `Bearer ${token}`,
		  }
		: undefined;
	return await api.get<User>("users/current-user", {
		headers,
		signal,
	});
};

/**
 * sends request to server to register user
 * @param token
 * @param signal
 * @returns
 */
export const registerUserApi = async (
	token?: string | null,
	signal?: AbortSignal,
) => {
	const headers = token
		? {
				Authorization: `Bearer ${token}`,
		  }
		: undefined;
	return await api.get<{ access_token: string; user: User }>("auth/register", {
		headers,
		signal,
	});
};
