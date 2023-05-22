import { memo } from "react";
import { IconButton } from "react-native-paper";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { useTheme } from "../../contexts/ThemeContext";
import { navigate } from "../../routes/routerActions";

const SearchButton = () => {
	const onPress = () => {
		navigate("Search");

	};
	const { theme } = useTheme();
	return (
		<IconButton
			icon={() => (
				<IoniconsIcon color={theme.colors.primary} name={"search"} size={24} />
			)}
			onPress={onPress}
		/>
	);
};

export default memo(SearchButton);
