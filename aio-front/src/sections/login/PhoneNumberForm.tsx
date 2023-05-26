import { Text, TextInput, Button, HelperText } from "react-native-paper";
import { useLocalization } from "../../contexts/LocalizationContext";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { IEnTranslations } from "../../localization/en";

interface Props {
	phoneNumber: string;
	error: keyof IEnTranslations | "";
	onChangePhoneNumber: (text: string) => void;
	onPressGetOtpCode: VoidFunction;
	loading: boolean;
}

const PhoneNumberForm: FC<Props> = (props) => {
	const { t } = useLocalization();
	return (
		<>
			<Text style={styles.text}>
				{t("enter_your_phone_number_we_will_send_4_digits_verification_code")}
			</Text>
			<TextInput
				value={props.phoneNumber}
				onChangeText={props.onChangePhoneNumber}
				mode={"outlined"}
				keyboardType="number-pad"
				returnKeyType="done"
				placeholder={t("phoneNumber")}
				error={!!props.error}
			/>
			<HelperText visible={!!props.error} type={"error"}>
				{props.error ? t(props.error) : ""}
			</HelperText>
			<Button
				mode={"contained"}
				onPress={props.onPressGetOtpCode}
				style={styles.btn}
				loading={props.loading}
			>
				{t("get_verification_code")}
			</Button>
		</>
	);
};

const styles = StyleSheet.create({
	text: { textAlign: "center", fontSize: 18 },
	btn: { marginTop: 20 },
});

export default PhoneNumberForm;
