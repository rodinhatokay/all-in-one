import { DEV_PHONE_NUMBERS, CODE_FOR_DEV_PHONES } from "./otp.constants";

export const generateRandomSixDigitNumber = () => {
	const min = 100000;
	const max = 999999;
	const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	return randomNumber.toString();
};

export const isDevPhoneNumber = (phoneNumber: string) => {
	return !!DEV_PHONE_NUMBERS.find((val) => val === phoneNumber);
};

export const validateOtpCodeForDevPhoneNumber = (code: string) => {
	return CODE_FOR_DEV_PHONES === code;
};

export const devPhoneNumberWithValidOtp = (
	phoneNumber: string,
	otpCode: string,
) => {
	return (
		validateOtpCodeForDevPhoneNumber(otpCode) && isDevPhoneNumber(phoneNumber)
	);
};
