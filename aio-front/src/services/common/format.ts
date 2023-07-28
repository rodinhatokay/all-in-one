/**
 * formats local number (il) to global number
 * @param phoneNumber
 * @returns
 */
export const normalizePhoneNumberFormat = (phoneNumber: string) => {
	// Remove all non-numeric characters from the phone number
	phoneNumber = phoneNumber.replace(/\D/g, '');

	// If the phone number starts with "0", replace it with "+972"
	if (phoneNumber.startsWith('0')) {
		phoneNumber = '+972' + phoneNumber.slice(1);
	}

	// If the phone number does not start with "+", add it
	if (!phoneNumber.startsWith('+')) {
		phoneNumber = '+' + phoneNumber;
	}

	return phoneNumber;
};