import { OTP_LENGTH } from "../otp/otp.util";

export const validatePhoneNumber = (phoneNumber: string): boolean => {
	const phonePattern = /^\d{10}$/;
	return phonePattern.test(phoneNumber);
};

export const validateOTP = (otp: string): boolean => {
	return otp.length === OTP_LENGTH && /^\d+$/.test(otp);
};
