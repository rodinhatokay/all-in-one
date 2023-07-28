import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Image, Text } from '../../components/partials';
import { memo } from 'react';

const HeaderLogo = () => {
	const { theme } = useTheme();
	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/images/logo.png')}
				style={[styles.image, { tintColor: theme.colors.primary }]}
			/>
			<Text style={styles.label}>AiO</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flexDirection: 'row', alignItems: 'center' },
	image: {
		height: 50,
		width: 50,
		marginHorizontal: 5,
	},
	label: { fontSize: 25 },
});

export default memo(HeaderLogo);
