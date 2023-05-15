import { Text, TextInput, Button, useTheme } from "react-native-paper";
import { useLocalization } from "../../contexts/LocalizationContext";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface Props {
	onPress: VoidFunction;
}

const CodeForm: FC<Props> = ({ onPress }) => {
	const { t } = useLocalization();
	const theme = useTheme();
	return (
		<>
			<View
				style={{
					alignItems: "center",
					gap: 0,
					justifyContent: "center",
					flexDirection: "row",
				}}
			>
				<Text style={styles.text}>{t("enter_the_code_sent_to")}</Text>
				<Button
					mode={"text"}
					labelStyle={{ textDecorationLine: "underline", fontWeight: "700" }}
				>
					0524560793
				</Button>
			</View>
			<TextInput
				mode={"outlined"}
				keyboardType="number-pad"
				returnKeyType="done"
				placeholder={t("phoneNumber")}
			/>
			<Button
				textColor={theme.colors.tertiary}
				labelStyle={{ textDecorationLine: "underline" }}
			>
				{t("didnt_receive_otp")}
			</Button>
			<Button mode={"contained"} onPress={onPress}>
				{t("verify_and_continue")}
			</Button>
		</>
	);
};

const styles = StyleSheet.create({
	text: { textAlign: "center", fontSize: 18 },
});

export default CodeForm;
