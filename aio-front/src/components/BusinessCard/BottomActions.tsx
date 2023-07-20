import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import { useTheme } from '../../contexts/ThemeContext';

const iconSize = 22;
const hitSlop = 20;

interface Props {
	hasWhatsapp: boolean;
	handleCall: VoidFunction;
	handleWhatsApp: VoidFunction;
	handleSendSms: VoidFunction;
	handleShare: VoidFunction;
}

const BottomActions: FC<Props> = ({
	hasWhatsapp,
	handleCall,
	handleSendSms,
	handleShare,
	handleWhatsApp,
}) => {
	const { theme } = useTheme();

	const color = theme.colors.tertiary;
	const disabledColor = theme.colors.onSurfaceDisabled;
	return (
		<View style={styles.buttonContainer}>
			<IconButton
				icon={() => <FeatherIcon color={color} name="phone" size={iconSize} />}
				onPress={handleCall}
			/>
			<IconButton
				icon={() => (
					<Icon
						name="whatsapp"
						color={hasWhatsapp ? color : disabledColor}
						size={22}
					/>
				)}
				onPress={handleWhatsApp}
				disabled={!hasWhatsapp}
			/>
			<IconButton
				icon={() => (
					<FeatherIcon name="message-circle" color={color} size={iconSize} />
				)}
				onPress={handleSendSms}
			/>
			<IconButton
				icon={() => <FeatherIcon name="share" color={color} size={iconSize} />}
				onPress={handleShare}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 10,
	},
});

export default BottomActions;
