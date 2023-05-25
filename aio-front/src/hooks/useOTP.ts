import { useCallback, useMemo, useState } from "react";
import { generateOTPApi } from "../services/otp/otpApi";
import { logError } from "../services/logger/loggerService";

interface Props {
	onGetVerificationCode: () => void;
}

export const useOTP = (props: Props) => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [verificationCode, setVerificationCode] = useState("");
	const [loading, setLoading] = useState(false);

	const onPressGetVerificationCode = useCallback(async () => {
		try {
			if (phoneNumber.length !== 10) return;
			setLoading(true);
			await generateOTPApi(phoneNumber);
			props.onGetVerificationCode();
		} catch (e) {
			logError("error onPressGetVerificationCode", e);
		} finally {
			setLoading(false);
		}
	}, [phoneNumber, props.onGetVerificationCode, setLoading, loading]);

	/**
	 * validate via api if code inseted is correct
	 */
	const onPressValdiateVerficationCode = useCallback(() => {}, []);

	return useMemo(() => {
		return {
			phoneNumber,
			setPhoneNumber,
			verificationCode,
			setVerificationCode,
			loading,
			setLoading,
			onPressGetVerificationCode,
			onPressValdiateVerficationCode,
		};
	}, [
		phoneNumber,
		setPhoneNumber,
		verificationCode,
		setVerificationCode,
		loading,
		setLoading,
		onPressGetVerificationCode,
		onPressValdiateVerficationCode,
	]);
};

export default useOTP;
