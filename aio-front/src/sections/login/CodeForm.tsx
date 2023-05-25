import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { useLocalization } from "../../contexts/LocalizationContext";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
	onPressRegenerateOTP: VoidFunction;
	onPressVerifiy: VoidFunction;
	verificationCode: string;
	onChangeVerificationCode: (val: string) => void;
	phoneNumber: string;
	onPressPhoneNumber: VoidFunction;
	loading: boolean;
}

const CodeForm: FC<Props> = (props) => {
	const { t } = useLocalization();
	const theme = useTheme();
	return (
		<>
			<View style={styles.headerContainer}>
				<Text style={styles.text}>{t("enter_the_code_sent_to")}</Text>

				<Button
					mode={"text"}
					contentStyle={styles.phonNumberBtnContainer}
					labelStyle={styles.phoneNumberBtnLabel}
					onPress={props.onPressPhoneNumber}
				>
					{props.phoneNumber}
				</Button>
			</View>
			<TextInput
				value={props.verificationCode}
				onChangeText={props.onChangeVerificationCode}
				mode={"outlined"}
				keyboardType="number-pad"
				returnKeyType="done"
				placeholder={t("verification_code")}
			/>
			<Button
				onPress={props.onPressRegenerateOTP}
				textColor={theme.colors.tertiary}
				labelStyle={styles.labelResendOTP}
			>
				{t("didnt_receive_otp")}
			</Button>
			<Button
				loading={props.loading}
				mode={"contained"}
				onPress={props.onPressVerifiy}
			>
				{t("verify_and_continue")}
			</Button>
		</>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	text: { textAlign: "center", fontSize: 18 },
	phonNumberBtnContainer: {
		padding: 0,
		margin: -10,
	},
	phoneNumberBtnLabel: {
		textDecorationLine: "underline",
		fontWeight: "700",
	},
	labelResendOTP: { textDecorationLine: "underline" },
});

export default CodeForm;
