import { useState, useCallback } from "react";
import * as Haptics from "expo-haptics";
import { logError } from "../services/logger/loggerService";
import axios from "axios";
import { registerUserApi } from "../services/user/userApi";
import { useAuth } from "../contexts/AuthContext";
import { trimStringsInObj } from "../util/string.util";
import { normalizePhoneNumberFormat } from "../services/common/format";
type Errors = {
	[key in Inputs]: boolean;
};

type Inputs = "firstName" | "lastName" | "TAC" | "generic";

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
		generic: false,
	});

	const isValidForm = useCallback(() => {
		const _errors: Omit<Errors, "generic"> = {
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
			setErrors((state) => {
				return { ...state, _errors };
			});
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		}
		return isValidForm;
	}, [firstName, lastName, termsAccepted, setErrors, errors]);

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

	const handleRegister = useCallback(async () => {
		if (!isValidForm()) return;
		setErrors((state) => {
			return { ...state, generic: false };
		});
		try {
			setLoading(true);
			if (!phoneNumber || !access_token) {
				throw new Error(
					"phone number or access_token not provided to register user, this is error",
				);
			}
			const registerResp = await registerUserApi(
				trimStringsInObj({
					termsAccepted,
					firstName,
					lastName,
					phoneNumber: normalizePhoneNumberFormat(phoneNumber),
				}),
				access_token,
			);
			const { access_token: newAccessToken, user } = registerResp.data;
			await signIn(newAccessToken, user);

			// newAccessToken is token with access to all calls in the api
		} catch (err) {
			logError("error handleRegister:", err);
			if (
				axios.isAxiosError(err) &&
				(err.response?.status === 400 || err.response?.status === 500)
			) {
				setErrors((state) => {
					return { ...state, generic: true };
				});
			}
		} finally {
			setLoading(false);
		}
		// signIn();
		// else implement all logic to register..
	}, [setLoading, loading, lastName, firstName, phoneNumber, termsAccepted]);

	return {
		handleRegister,
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
