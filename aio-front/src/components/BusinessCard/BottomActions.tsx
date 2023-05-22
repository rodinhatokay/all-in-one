import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import FeatherIcon from "react-native-vector-icons/Feather";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import { useTheme } from "../../contexts/ThemeContext";

const iconSize = 22;
const hitSlop = 20;

interface Props {
	handleCall: VoidFunction;
	handleWhatsApp: VoidFunction;
	handleSaveContact: VoidFunction;
	handleShare: VoidFunction;
}

const BottomActions: FC<Props> = ({
	handleCall,
	handleSaveContact,
	handleShare,
	handleWhatsApp,
}) => {
	const { theme } = useTheme();

	const color = theme.colors.tertiary;
	return (
		<View style={styles.buttonContainer}>
			<IconButton
				hitSlop={hitSlop}
				icon={() => <FeatherIcon color={color} name="phone" size={iconSize} />}
				onPress={handleCall}
			/>
			<IconButton
				hitSlop={hitSlop}
				icon={() => <Icon name="whatsapp" color={color} size={iconSize} />}
				onPress={handleWhatsApp}
			/>
			<IconButton
				hitSlop={hitSlop}
				icon={() => (
					<OcticonsIcon name="person-add" color={color} size={iconSize} />
				)}
				onPress={handleSaveContact}
			/>
			<IconButton
				hitSlop={hitSlop}
				icon={() => <FeatherIcon name="share" color={color} size={iconSize} />}
				onPress={handleShare}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 10,
	},
});

export default BottomActions;
