import { OTP_LENGTH } from "../otp/otp.util";

/**
 * validates phone number
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phoneNumber);
};

/**
 * validates otp
 */
export const validateOTP = (otp: string): boolean => {
  return otp.length === OTP_LENGTH && /^\d+$/.test(otp);
};
