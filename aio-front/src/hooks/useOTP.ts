import { useCallback, useMemo, useState } from "react";
import { generateOtpApi, verifyOtpCodeApi } from "../services/otp/otpApi";
import { logError } from "../services/logger/loggerService";
import { validateOTP, validatePhoneNumber } from "../services/common/validate";
import { IEnTranslations } from "../localization/en";

/**
 * otp hook that handles all logic related to authenticate via otp
 */
export const useOTP = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [errorPhoneNumber, setErrorPhoneNumber] = useState<
		keyof IEnTranslations | ""
	>("");
	const [otpCode, setOtpCode] = useState("");
	const [errorOtpCode, setErrorOtpCode] = useState<keyof IEnTranslations | "">(
		""
	);
	const [loading, setLoading] = useState(false);

	const getOtpCode = useCallback(async () => {
		try {
			if (!validatePhoneNumber(phoneNumber)) {
				setErrorPhoneNumber("invalidPhoneNumber");
				return;
			}
			setLoading(true);
			await generateOtpApi(phoneNumber);
		} catch (e) {
			logError("error onPressGetotp", e);
		} finally {
			setLoading(false);
		}
	}, [phoneNumber, setLoading, loading]);

	/**
	 * validate via api if code inserted is correct
	 */
	const valdiateOtpCode = useCallback(async () => {
		try {
			if (!validatePhoneNumber(phoneNumber)) {
				setErrorPhoneNumber("invalidPhoneNumber");
				return;
			}
			if (!validateOTP(otpCode)) {
				setErrorOtpCode("invalidOtpCode");
				return;
			}
			setLoading(true);
			const responseVerification = await verifyOtpCodeApi({
				otpCode,
				phoneNumber,
			});
			return responseVerification.data;
		} catch (e) {
			logError("error onPressValdiateVerficationCode", e);
		} finally {
			setLoading(false);
		}
	}, [setErrorPhoneNumber, setErrorOtpCode, setLoading, otpCode, phoneNumber]);

	return useMemo(() => {
		return {
			phoneNumber,
			setPhoneNumber,
			otpCode,
			setOtpCode,
			loading,
			getOtpCode,
			valdiateOtpCode,
			errorOtpCode,
			errorPhoneNumber,
		};
	}, [
		phoneNumber,
		setPhoneNumber,
		otpCode,
		setOtpCode,
		loading,
		getOtpCode,
		valdiateOtpCode,
		errorOtpCode,
		errorPhoneNumber,
	]);
};

export default useOTP;
