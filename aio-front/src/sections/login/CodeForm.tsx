import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { useLocalization } from "../../contexts/LocalizationContext";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { navigate } from "../../routes/routerActions";

interface Props {
	onPress: VoidFunction;
}

const CodeForm: FC<Props> = ({ onPress }) => {
	const { t } = useLocalization();
	const theme = useTheme();
	const { signIn } = useAuth();
	return (
		<>
			<View style={styles.headerContainer}>
				<Text style={styles.text}>{t("enter_the_code_sent_to")}</Text>

				<Button
					mode={"text"}
					contentStyle={styles.phonNumberBtnContainer}
					labelStyle={styles.phoneNumberBtnLabel}
				>
					0524560793
				</Button>
			</View>
			<TextInput
				mode={"outlined"}
				keyboardType="number-pad"
				returnKeyType="done"
				placeholder={t("verification_code")}
			/>
			<Button
				textColor={theme.colors.tertiary}
				labelStyle={{ textDecorationLine: "underline" }}
			>
				{t("didnt_receive_otp")}
			</Button>
			<Button
				mode={"contained"}
				onPress={() => {
					navigate("register");
				}}
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
});

export default CodeForm;
