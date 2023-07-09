import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme, Text, Appbar } from "react-native-paper";
import { useLocalization } from "../contexts/LocalizationContext";
import { Image } from "expo-image";
import LocaleSelector from "../components/LocaleSelector/LocaleSelector";
import PhoneNumberForm from "../sections/login/PhoneNumberForm";
import OtpCodeForm from "../sections/login/OtpCodeForm";
import { useCallback, useState } from "react";
import useOTP from "../hooks/useOTP";
import { logError } from "../services/logger/loggerService";

/**
 * Login screen
 */
const LoginScreen = () => {
	const { t } = useLocalization();
	const theme = useTheme();

	const [displayFormCode, setDisplayFormCode] = useState(false);

	const {
		loading,
		phoneNumber,
		setPhoneNumber,
		getOtpCode,
		valdiateOtpCode,
		otpCode,
		setOtpCode,
		errorOtpCode,
		errorPhoneNumber,
	} = useOTP();

	const onPressGetOtpCode = useCallback(async () => {
		try {
			await getOtpCode();
			setDisplayFormCode(true);
		} catch (error) {
			logError("error occured in onPressGetOtpCode", error);
			throw error;
		}
	}, [setDisplayFormCode, getOtpCode]);

	const displayPhoneNumberForm = useCallback(() => {
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
				keyboardShouldPersistTaps={"handled"}
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
							onPressGetOtpCode={onPressGetOtpCode}
							error={errorPhoneNumber}
						/>
					) : (
						<OtpCodeForm
							loading={loading}
							otpCode={otpCode}
							onPressPhoneNumber={displayPhoneNumberForm}
							onChangeOtpCode={setOtpCode}
							onPressResendOtpCode={getOtpCode}
							onPressValidateOtpCode={valdiateOtpCode}
							phoneNumber={phoneNumber}
							errorOtpCode={errorOtpCode}
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
