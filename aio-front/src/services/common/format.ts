/**
 * formats local number (il) to global number
 * @param phoneNumber
 * @returns
 */
export const formatPhoneNumberToGlobal = (phoneNumber: string) => {
	return `+972${phoneNumber.slice(1)}`;
};
