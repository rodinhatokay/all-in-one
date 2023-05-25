import api from "../api/api";

/**
 * sends request to generate otp to server
 * @param phoneNumber
 * @param signal
 * @returns
 */
export const generateOTPApi = async (
	phoneNumber: string,
	signal?: AbortSignal
) => {
	return await api.post(
		"otp/create",
		{
			phoneNumber: phoneNumber,
			channel: "sms",
		},
		{
			signal,
		}
	);
};

/**
 * validates given code with phone number
 * @param data
 * @param signal
 * @returns
 */
export const verifyOTPApi = async (
	data: { otpCode: string; phoneNumber: string },
	signal?: AbortSignal
) => {
	return await api.post<JwtPayload>("otp/verify", data, {
		signal,
	});
};
