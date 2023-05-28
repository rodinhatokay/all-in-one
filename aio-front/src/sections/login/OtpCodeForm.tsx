import {
	Text,
	TextInput,
	Button,
	useTheme,
	HelperText,
} from "react-native-paper";
import { useLocalization } from "../../contexts/LocalizationContext";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IEnTranslations } from "../../localization/en";
import { OTP_LENGTH } from "../../services/otp/otp.util";

interface Props {
	onPressResendOtpCode: VoidFunction;
	onPressValidateOtpCode: VoidFunction;
	otpCode: string;
	onChangeOtpCode: (val: string) => void;
	phoneNumber: string;
	onPressPhoneNumber: VoidFunction;
	loading: boolean;
	errorOtpCode: keyof IEnTranslations | "";
}

/**
 * form for filling otp code, also re-requesting again otp code,
 * or changing phoneNumber
 */
const OtpCodeForm: FC<Props> = (props) => {
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
			<View>
				<TextInput
					value={props.otpCode}
					onChangeText={props.onChangeOtpCode}
					mode={"outlined"}
					keyboardType="number-pad"
					returnKeyType="done"
					placeholder={t("verification_code")}
					error={!!props.errorOtpCode}
					maxLength={OTP_LENGTH}
					onSubmitEditing={props.onPressValidateOtpCode}
				/>
				<HelperText visible={!!props.errorOtpCode} type={"error"}>
					{props.errorOtpCode ? t(props.errorOtpCode) : null}
				</HelperText>
			</View>
			<Button
				onPress={props.onPressResendOtpCode}
				textColor={theme.colors.tertiary}
				labelStyle={styles.labelResendOTP}
			>
				{t("didnt_receive_otp")}
			</Button>
			<Button
				loading={props.loading}
				mode={"contained"}
				onPress={props.onPressValidateOtpCode}
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

export default OtpCodeForm;
