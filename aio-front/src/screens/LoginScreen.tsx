import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme, Text, Appbar } from "react-native-paper";
import { useLocalization } from "../contexts/LocalizationContext";
import { Image } from "expo-image";
import LocaleSelector from "../components/LocaleSelector/LocaleSelector";
import PhoneNumberForm from "../sections/login/PhoneNumberForm";
import CodeForm from "../sections/login/CodeForm";
import { useState } from "react";

/**
 * Login screen
 */
const LoginScreen = () => {
	const { t } = useLocalization();
	const theme = useTheme();

	const [displayFormCode, setDisplayFormCode] = useState(false);

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
				<Text style={styles.header}>AiO</Text>
				<Text style={styles.subHeader}>All in One</Text>
				<Image
					source={require("../../assets/images/logo.png")}
					style={[styles.logo, { tintColor: theme.colors.primary }]}
					tintColor={theme.colors.primary}
					contentFit="contain"
				/>

				<View style={styles.contentContainer}>
					{!displayFormCode ? (
						<PhoneNumberForm onPress={() => setDisplayFormCode(true)} />
					) : (
						<CodeForm
							onPress={() => {
								throw new Error("need to implement");
							}}
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
