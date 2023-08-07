import { FC } from 'react';
import { Image, Text } from '../partials';
import { StyleSheet, View } from 'react-native';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useTheme } from '../../contexts/ThemeContext';

interface Props {
	logoPath?: string | null;
	altText?: string;
}

const LogoImage: FC<Props> = ({ logoPath, altText }) => {
	const { t } = useLocalization();
	const { theme } = useTheme();
	if (!logoPath) {
		return (
			<View
				style={[
					styles.size,
					styles.containerText,
					{ backgroundColor: theme.colors.primary },
				]}
			>
				<Text style={styles.text}>{altText ?? t('noImage')}</Text>
			</View>
		);
	}
	return (
		<View style={styles.shadow}>
			<Image
				source={{
					uri: logoPath,
				}}
				style={styles.size}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	size: {
		width: 90,
		height: 90,
		marginRight: 15,
		borderRadius: 50,
	},
	text: {
		textAlign: 'center',
		fontFamily: 'Rubik-SemiBoldItalic',
		color: 'white',
	},
	containerText: {
		justifyContent: 'center',
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 3,
	},
});

export default LogoImage;
