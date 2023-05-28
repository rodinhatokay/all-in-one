/**
 * formats local number (il) to global number
 * @param phoneNumber
 * @returns
 */
export const fPhoneNumberToGlobal = (phoneNumber: string) => {
	return `+972${phoneNumber.slice(1)}`;
};
