import { FC, ReactNode, memo } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useTheme } from "../../contexts/ThemeContext";

interface Props {
	children?: ReactNode;
}

const Title: FC<Props> = ({ children }) => {
	const { theme } = useTheme();
	return (
		<Text
			variant="headlineSmall"
			style={[
				styles.text,
				{
					backgroundColor: theme.colors.lightBackground,
				},
			]}
		>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		paddingHorizontal: 20,
		paddingVertical: 5,
	},
});

export default memo(Title);
