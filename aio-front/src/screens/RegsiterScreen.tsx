import {
	View,
	StyleSheet,
	ScrollView,
	TextInput as RNTextInput,
} from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import TermsAndConditionsCheckBox from "../components/TermsAndConditionsCheckBox/TermsAndConditionsCheckBox";
import { useLocalization } from "../contexts/LocalizationContext";
import { useTheme } from "../contexts/ThemeContext";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRegister } from "../hooks/useRegister";
import { NoAuthStack } from "../routes/types";
import { useCallback, useRef } from "react";

type Props = NativeStackScreenProps<NoAuthStack, "register">;

const RegisterScreen = ({ route }: Props) => {
	const { t } = useLocalization();
	const { theme } = useTheme();
	const { access_token, phoneNumber } = route.params;

	const {
		termsAccepted,
		errors,
		firstName,
		lastName,
		loading,
		onChangeFirstName,
		onChangeLastName,
		onPressTermsAndConditions,
		handleRegister,
	} = useRegister(phoneNumber, access_token);

	const focusLastNameInput = useCallback(() => {
		if (lastNameInputRef.current) {
			lastNameInputRef.current.focus();
		}
	}, []);

	const lastNameInputRef = useRef<RNTextInput | null>(null);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ gap: 5 }}
			keyboardShouldPersistTaps={"handled"}
		>
			<View>
				<TextInput
					label="First Name"
					value={firstName}
					style={[styles.textInput, { backgroundColor: theme.colors.surface }]}
					onChangeText={onChangeFirstName}
					onSubmitEditing={focusLastNameInput}
				/>
				<HelperText type="error" visible={errors.firstName}>
					{t("pleaseEnterYourFirstName")}
				</HelperText>
			</View>
			<View>
				<TextInput
					ref={lastNameInputRef}
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
			<Button
				mode="contained"
				disabled={loading}
				onPress={handleRegister}
				style={styles.btnRegister}
			>
				{t("register")}
			</Button>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	textInput: {
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
