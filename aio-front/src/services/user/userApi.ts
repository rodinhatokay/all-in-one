import api from "../api/api";
import { User } from "./user.types";

export const getCurrentUserApi = async (
	token?: string | null,
	signal?: AbortSignal
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
