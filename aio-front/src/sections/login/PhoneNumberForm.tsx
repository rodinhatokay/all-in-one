import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { useLocalization } from "../../contexts/LocalizationContext";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IEnTranslations } from "../../localization/en";

interface Props {
	phoneNumber: string;
	error: keyof IEnTranslations | "";
	onChangePhoneNumber: (text: string) => void;
	onPressGetOtpCode: VoidFunction;
	loading: boolean;
}

/**
 * form for phoneNumber in otp
 */
const PhoneNumberForm: FC<Props> = (props) => {
	const { t } = useLocalization();
	return (
		<>
			<Text style={styles.text}>
				{t("enterYourPhoneNumberWeWillSendXDigitsVerificationCode")}
			</Text>
			<View>
				<TextInput
					value={props.phoneNumber}
					onChangeText={props.onChangePhoneNumber}
					mode={"outlined"}
					keyboardType="number-pad"
					returnKeyType="done"
					placeholder={t("phoneNumber")}
					maxLength={10}
					error={!!props.error}
					onSubmitEditing={props.onPressGetOtpCode}
				/>
				<HelperText visible={!!props.error} type={"error"}>
					{props.error ? t(props.error) : ""}
				</HelperText>
			</View>
			<Button
				mode={"contained"}
				onPress={props.onPressGetOtpCode}
				style={styles.btn}
				loading={props.loading}
				disabled={props.loading}
			>
				{t("getVerificationCode")}
			</Button>
		</>
	);
};

const styles = StyleSheet.create({
	text: { textAlign: "center", fontSize: 18 },
	btn: { marginTop: 20 },
});

export default PhoneNumberForm;
