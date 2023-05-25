import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme, Text, Appbar } from "react-native-paper";
import { useLocalization } from "../contexts/LocalizationContext";
import { Image } from "expo-image";
import LocaleSelector from "../components/LocaleSelector/LocaleSelector";
import PhoneNumberForm from "../sections/login/PhoneNumberForm";
import CodeForm from "../sections/login/CodeForm";
import { useCallback, useState } from "react";
import { generateOTPApi } from "../services/otp/otpApi";
import { logError } from "../services/logger/loggerService";
import useOTP from "../hooks/useOTP";

/**
 * Login screen
 */
const LoginScreen = () => {
	const { t } = useLocalization();
	const theme = useTheme();

	const [displayFormCode, setDisplayFormCode] = useState(false);

	const displayVerificatonCodeForm = useCallback(
		() => setDisplayFormCode(true),
		[setDisplayFormCode]
	);

	const {
		loading,
		onPressGetVerificationCode,
		onPressValdiateVerficationCode,
		phoneNumber,
		setLoading,
		setPhoneNumber,
		setVerificationCode,
		verificationCode,
	} = useOTP({
		onGetVerificationCode: displayVerificatonCodeForm,
	});

	const onPressChangePhoneNumber = useCallback(() => {
		setDisplayFormCode(false);
	}, []);

	return (
		<View style={styles.main}>
			<Appbar.Header>
				<LocaleSelector />
			</Appbar.Header>
			<ScrollView
				bounces={false}
				contentContainerStyle={styles.scroll}
				style={styles.main}
			>
				<Text style={styles.header}>{t("aio")}</Text>
				<Text style={styles.subHeader}>{t("allInOne")}</Text>
				<Image
					source={require("../../assets/images/logo.png")}
					style={[styles.logo, { tintColor: theme.colors.primary }]}
					tintColor={theme.colors.primary}
					contentFit="contain"
				/>

				<View style={styles.contentContainer}>
					{!displayFormCode ? (
						<PhoneNumberForm
							loading={loading}
							onChangePhoneNumber={setPhoneNumber}
							phoneNumber={phoneNumber}
							onPressGetVerificationCode={onPressGetVerificationCode}
						/>
					) : (
						<CodeForm
							loading={loading}
							verificationCode={verificationCode}
							onPressPhoneNumber={onPressChangePhoneNumber}
							onChangeVerificationCode={setVerificationCode}
							onPressRegenerateOTP={onPressGetVerificationCode}
							onPressVerifiy={onPressValdiateVerficationCode}
							phoneNumber={phoneNumber}
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},
	scroll: { alignItems: "center", flex: 1 },
	header: { fontSize: 35 },
	subHeader: { fontSize: 18 },
	contentContainer: {
		gap: 20,
		padding: 15,
		flex: 1,
		width: "100%",
	},
	logo: { height: 120, width: 150 },
});

export default LoginScreen;
