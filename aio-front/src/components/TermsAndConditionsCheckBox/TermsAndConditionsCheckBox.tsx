import { FC, useState } from "react";
import {
	StyleSheet,
	Pressable,
	View,
	Dimensions,
	ScrollView,
} from "react-native";
import {
	Checkbox,
	Dialog,
	HelperText,
	Portal,
	Button,
	Text,
} from "react-native-paper";
import { useLocalization } from "../../contexts/LocalizationContext";
import { useTheme } from "../../contexts/ThemeContext";

interface Props {
	checked: boolean;
	onCheck: (val: boolean) => void;
	error: boolean;
}

const TermsAndConditionsCheckBox: FC<Props> = (props) => {
	const { checked, error, onCheck } = props;
	const { t } = useLocalization();
	const { theme } = useTheme();
	const [isDisplayTAC, setIsDisplayTAC] = useState(false);

	const displayTermsAndConditions = () => setIsDisplayTAC(true);

	const hideTAC = () => setIsDisplayTAC(false);

	return (
		<>
			<Pressable onPress={() => onCheck(!checked)}>
				<View style={styles.checkboxContainer}>
					<Checkbox.Android status={checked ? "checked" : "unchecked"} />
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Text>{t("iAgreeToThe")}</Text>
						<Pressable hitSlop={20} onPress={displayTermsAndConditions}>
							<Text
								style={[
									styles.termsAndCondidtionsTxt,
									{ color: theme.colors.primary },
								]}
							>
								{" "}
								{t("termsAndConditions")}
							</Text>
						</Pressable>
					</View>
				</View>
				<HelperText type="error" visible={error}>
					{t("pleaseAccpetTheTermsAndConditionsToProceed")}
				</HelperText>
			</Pressable>
			<Portal>
				<Dialog
					onDismiss={hideTAC}
					visible={isDisplayTAC}
					style={{ maxHeight: 0.6 * Dimensions.get("window").height }}
				>
					<Dialog.Title>{t("termsAndConditions")}</Dialog.Title>
					<Dialog.ScrollArea style={styles.smallPadding}>
						<ScrollView contentContainerStyle={styles.biggerPadding}>
							<Text>
								Material is the metaphor
								{"\n"}
								{"\n"}A material metaphor is the unifying theory of a
								rationalized space and a system of motion. The material is
								grounded in tactile reality, inspired by the study of paper and
								ink, yet technologically advanced and open to imagination and
								magic.
								{"\n"}
								{"\n"}
								Surfaces and edges of the material provide visual cues that are
								grounded in reality. The use of familiar tactile attributes
								helps users quickly understand affordances. Yet the flexibility
								of the material creates new affordances that supersede those in
								the physical world, without breaking the rules of physics.
								{"\n"}
								{"\n"}
								The fundamentals of light, surface, and movement are key to
								conveying how objects move, interact, and exist in space and in
								relation to each other. Realistic lighting shows seams, divides
								space, and indicates moving parts.
								{"\n"}
								{"\n"}A material metaphor is the unifying theory of a
								rationalized space and a system of motion. The material is
								grounded in tactile reality, inspired by the study of paper and
								ink, yet technologically advanced and open to imagination and
								magic.
								{"\n"}
								{"\n"}
								Surfaces and edges of the material provide visual cues that are
								grounded in reality. The use of familiar tactile attributes
								helps users quickly understand affordances. Yet the flexibility
								of the material creates new affordances that supersede those in
								the physical world, without breaking the rules of physics.
								{"\n"}
								{"\n"}
								The fundamentals of light, surface, and movement are key to
								conveying how objects move, interact, and exist in space and in
								relation to each other. Realistic lighting shows seams, divides
								space, and indicates moving parts.
							</Text>
						</ScrollView>
					</Dialog.ScrollArea>
					<Dialog.Actions>
						<Button onPress={hideTAC}>Ok</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</>
	);
};

const styles = StyleSheet.create({
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
	},
	termsAndCondidtionsTxt: { textDecorationLine: "underline" },
	smallPadding: {
		paddingHorizontal: 0,
	},
	biggerPadding: {
		paddingHorizontal: 24,
	},
});

export default TermsAndConditionsCheckBox;
