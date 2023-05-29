import { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import TermsAndConditionsCheckBox from "../components/TermsAndConditionsCheckBox/TermsAndConditionsCheckBox";
import { useLocalization } from "../contexts/LocalizationContext";
import * as Haptics from "expo-haptics";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

type Errors = {
	[key in Inputs]: boolean;
};

type Inputs = "firstName" | "lastName" | "TAC";

const RegisterScreen = () => {
	const { t } = useLocalization();
	const { signIn } = useAuth();
	const { theme } = useTheme();

	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [phoneNumber, setPhoneNumber] = useState<string>("0521234567");
	const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

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

	const register = () => {
		if (!isValidForm()) return;
		signIn();
		// else implement all logic to register..
	};

	return (
		<ScrollView style={styles.container} contentContainerStyle={{ gap: 5 }}>
			<View>
				<TextInput
					label="First Name"
					value={firstName}
					style={[styles.textInput, { backgroundColor: theme.colors.surface }]}
					onChangeText={onChangeFirstName}
				/>
				<HelperText type="error" visible={errors.firstName}>
					{t("pleaseEnterYourFirstName")}
				</HelperText>
			</View>
			<View>
				<TextInput
					label="Last Name"
					value={lastName}
					style={[styles.textInput, { backgroundColor: theme.colors.surface }]}
					onChangeText={onChangeLastName}
				/>
				<HelperText type="error" visible={errors.lastName}>
					{t("pleaseEnterYourLastName")}
				</HelperText>
			</View>

			<View>
				<TextInput
					label="Phone Number"
					value={phoneNumber}
					disabled
					style={[styles.textInput, { backgroundColor: theme.colors.surface }]}
					onChangeText={setPhoneNumber}
				/>
				<HelperText type="error" visible={false}>
					this is making space not a text!
				</HelperText>
			</View>

			<TermsAndConditionsCheckBox
				checked={termsAccepted}
				onCheck={onPressTermsAndConditions}
				error={errors.TAC ?? false}
			/>
			<Button mode="contained" onPress={register} style={styles.btnRegister}>
				{t("register")}
			</Button>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		padding: 16,
	},
	textInput: {
		// backgroundColor: "white",
		marginVertical: 0,
		paddingVertical: 0,
	},

	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	btnRegister: { margin: 15 },
});

export default RegisterScreen;
