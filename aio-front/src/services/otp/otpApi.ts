import api from "../api/api";
import { JwtPayload } from "../auth/types";

/**
 * sends request to generate otp to server
 * @param phoneNumber
 * @param signal
 * @returns
 */
export const generateOtpApi = async (
	phoneNumber: string,
	signal?: AbortSignal,
) => {
	return await api.post(
		"otp/create",
		{
			phoneNumber: phoneNumber,
			channel: "sms",
		},
		{
			signal,
		},
	);
};

/**
 * validates given code with phone number
 * @param data
 * @param signal
 * @returns
 */
export const verifyOtpCodeApi = async (
	data: { otpCode: string; phoneNumber: string },
	signal?: AbortSignal,
) => {
	return await api.post<JwtPayload>("otp/verify", data, {
		signal,
	});
};
