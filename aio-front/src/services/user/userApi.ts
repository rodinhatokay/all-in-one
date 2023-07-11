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
	return await api.get<User>("user/current-user", {
		headers,
		signal,
	});
};

interface RegisterDto {
	phoneNumber: string;
	firstName: string;
	lastName: string;
	termsAccepted: boolean;
}

/**
 * sends request to server to register user
 * @param token
 * @param signal
 * @returns
 */
export const registerUserApi = async (
	registerDetails: RegisterDto,
	token: string | null,
	signal?: AbortSignal,
) => {
	return await api.post<{ access_token: string; user: User }>(
		"auth/register",
		registerDetails,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},

			signal,
		},
	);
};
