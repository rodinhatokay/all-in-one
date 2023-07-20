import { useCallback, useMemo, useState } from "react";
import { generateOtpApi, verifyOtpCodeApi } from "../services/otp/otpApi";
import { logError } from "../services/logger/loggerService";
import { validateOTP, validatePhoneNumber } from "../services/common/validate";
import { IEnTranslations } from "../localization/en";
import { formatPhoneNumberToGlobal } from "../services/common/format";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { navigate } from "../routes/routerActions";

/**
 * otp hook that handles all logic related to authenticate via otp
 */
export const useOTP = () => {
	const { signIn } = useAuth();
	const [phoneNumber, setPhoneNumber] = useState("");
	const [errorPhoneNumber, setErrorPhoneNumber] = useState<
		keyof IEnTranslations | ""
	>("");
	const [otpCode, setOtpCode] = useState("");
	const [errorOtpCode, setErrorOtpCode] = useState<keyof IEnTranslations | "">(
		"",
	);
	const [loading, setLoading] = useState(false);

	const getOtpCode = useCallback(async () => {
		try {
			if (!validatePhoneNumber(phoneNumber)) {
				setErrorPhoneNumber("invalidPhoneNumber");
				throw new Error("invalidPhoneNumber");
			}
			setLoading(true);
			await generateOtpApi(formatPhoneNumberToGlobal(phoneNumber));
		} catch (err) {
			logError("error onPressGetotp", err);
			if (axios.isAxiosError(err) && err.response?.status === 400) {
				setErrorPhoneNumber("invalidPhoneNumber");
			}
			else { 
				setErrorPhoneNumber("genericError")
			}
			throw err;
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
				throw new Error("invalidPhoneNumber");
			}
			if (!validateOTP(otpCode)) {
				setErrorOtpCode("invalidOtpCode");
				throw new Error("invalidOtpCode");
			}
			setLoading(true);
			const responseVerification = await verifyOtpCodeApi({
				otpCode,
				phoneNumber: formatPhoneNumberToGlobal(phoneNumber),
			});
			const responseValidation = responseVerification.data;
			const { access_token, isUserRegistered } = responseValidation;
			if (isUserRegistered) {
				// fetch user details then login
				await signIn(access_token);
			} else {
				// navigate to regiser screen with phone number and access_token (for register)
				navigate("register", { access_token, phoneNumber });
			}
		} catch (err) {
			if (axios.isAxiosError(err) && err.response?.status === 400) {
				setErrorOtpCode("invalidOtpCode");
			}
			logError("error onPressValdiateVerficationCode", err);
			throw err;
		} finally {
			setLoading(false);
		}
	}, [setErrorPhoneNumber, setErrorOtpCode, setLoading, otpCode, phoneNumber]);

	const _setPhoneNumber = useCallback(
		(phoneNumber: string) => {
			setPhoneNumber(phoneNumber);
			setErrorPhoneNumber("");
		},
		[setPhoneNumber, setErrorPhoneNumber],
	);

	const _setOtpCode = useCallback(
		(otpCode: string) => {
			setOtpCode(otpCode);
			setErrorOtpCode("");
		},
		[setOtpCode, setErrorOtpCode],
	);

	return useMemo(() => {
		return {
			phoneNumber,
			setPhoneNumber: _setPhoneNumber,
			otpCode,
			setOtpCode: _setOtpCode,
			loading,
			getOtpCode,
			valdiateOtpCode,
			errorOtpCode,
			errorPhoneNumber,
		};
	}, [
		phoneNumber,
		_setPhoneNumber,
		otpCode,
		_setOtpCode,
		loading,
		getOtpCode,
		valdiateOtpCode,
		errorOtpCode,
		errorPhoneNumber,
	]);
};

export default useOTP;
