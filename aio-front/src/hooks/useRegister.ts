import { useState, useCallback } from "react";
import * as Haptics from "expo-haptics";
import { logError } from "../services/logger/loggerService";
import axios from "axios";
import { registerUserApi } from "../services/user/userApi";
import { useAuth } from "../contexts/AuthContext";
type Errors = {
	[key in Inputs]: boolean;
};

type Inputs = "firstName" | "lastName" | "TAC";

export const useRegister = (phoneNumber?: string, access_token?: string) => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
	const [loading, setLoading] = useState(false);

	const { signIn } = useAuth();

	const [errors, setErrors] = useState<Errors>({
		firstName: false,
		lastName: false,
		TAC: false,
	});

	const isValidForm = useCallback(() => {
		const _errors: Errors = {
			firstName: false,
			lastName: false,
			TAC: false,
		};
		let isValidForm = true;
		if (firstName.trim() === "") {
			_errors.firstName = true;
			isValidForm = false;
		}
		if (lastName.trim() === "") {
			_errors.lastName = true;
			isValidForm = false;
		}
		if (!termsAccepted) {
			_errors.TAC = true;
			isValidForm = false;
		}
		if (!isValidForm) {
			setErrors(_errors);
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		}
		return isValidForm;
	}, [firstName, lastName, termsAccepted, setErrors]);

	const onChangeFirstName = useCallback(
		(text: string) => {
			setFirstName(text);
			setErrors((_erros) => {
				return { ..._erros, firstName: false };
			});
		},
		[setErrors, setFirstName],
	);

	const onChangeLastName = useCallback(
		(text: string) => {
			setLastName(text);
			setErrors((_erros) => {
				return { ..._erros, lastName: false };
			});
		},
		[setErrors, setLastName],
	);

	const onPressTermsAndConditions = useCallback(
		(value: boolean) => {
			setTermsAccepted(value);
			setErrors((_erros) => {
				return { ..._erros, TAC: false };
			});
		},
		[setErrors, setTermsAccepted],
	);

	const register = useCallback(async () => {
		if (!isValidForm()) return;
		try {
			setLoading(true);
			const registerResp = await registerUserApi(access_token);
			const { access_token: newAccessToken, user } = registerResp.data;
			await signIn(newAccessToken, user);

			// newAccessToken is token with access to all calls in the api
		} catch (err) {
			logError("error onPressGetotp", err);
			if (axios.isAxiosError(err) && err.response?.status === 400) {
				// some error form client
			}
		} finally {
			setLoading(false);
		}
		// signIn();
		// else implement all logic to register..
	}, [setLoading, loading, lastName, firstName, phoneNumber, termsAccepted]);

	return {
		register,
		onPressTermsAndConditions,
		onChangeFirstName,
		onChangeLastName,
		errors,
		firstName,
		lastName,
		termsAccepted,
		loading,
	};
};
