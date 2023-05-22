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
				icon={() => <FeatherIcon color={color} name="phone" size={22} />}
				onPress={handleCall}
			/>
			<IconButton
				icon={() => <Icon name="whatsapp" color={color} size={22} />}
				onPress={handleWhatsApp}
			/>
			<IconButton
				icon={() => <OcticonsIcon name="person-add" color={color} size={22} />}
				onPress={handleSaveContact}
			/>
			<IconButton
				icon={() => <FeatherIcon name="share" color={color} size={22} />}

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
