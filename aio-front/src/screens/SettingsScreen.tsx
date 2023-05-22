import { useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";
import { ThemeMode, useTheme } from "../contexts/ThemeContext";
import AnimatedLottieView from "lottie-react-native";
import Title from "../sections/Settings/Title";
import { useLocalization } from "../contexts/LocalizationContext";
import { useAuth } from "../contexts/AuthContext";
import LogoutDialog, {
	DialogRef,
} from "../components/DialogLogout/DialogLogout";

const SettingsScreen = () => {
	const { changeTheme, mode } = useTheme();
	const { t } = useLocalization();

	const logoutDialogRef = useRef<DialogRef>(null);

	const openLogoutDialog = () => {
		logoutDialogRef.current?.showDialog();
	};

	return (
		<View style={styles.main}>
			<Title>{t("appearances")}</Title>
			<RadioButton.Group
				onValueChange={(val) => changeTheme(val as ThemeMode)}
				value={mode}
			>
				<RadioButton.Item
					label="Automatic (follow iOS setting)"
					value="deviceTheme"
				/>
				<RadioButton.Item label="Light theme" value="light" />
				<RadioButton.Item label="Dark theme" value="dark" />
			</RadioButton.Group>
			<Button
				mode="text"
				onPress={openLogoutDialog}
				style={styles.logoutButton}
			>
				{t("logOut")}
			</Button>

			<View style={styles.animationContainer}>
				<AnimatedLottieView
					source={require("../../assets/lottieAnimations/profile-lock.json")}
					style={styles.animation}
					resizeMode="contain"
					loop
					autoPlay
				/>
			</View>
			<LogoutDialog ref={logoutDialogRef} />
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
	},

	logoutButton: {
		marginTop: 10,
		marginHorizontal: 10,
		alignSelf: "flex-start",
	},
	animationContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	animation: {
		height: 250,
		width: 250,
	},
});

export default SettingsScreen;
