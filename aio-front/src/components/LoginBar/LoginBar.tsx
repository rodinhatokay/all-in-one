import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Text } from '../partials';
import { navigate } from '../../routes/routerActions';
import { useCallback } from 'react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useTheme } from '../../contexts/ThemeContext';

const LoginBar = () => {
	const onPressLogin = useCallback(() => navigate('login'), []);
	const { t } = useLocalization();
	const { theme } = useTheme();
	return (
		<View
			style={[
				styles.main,
				{
					borderTopColor: theme.colors.backdrop,
					backgroundColor: theme.colors.surface,
				},
			]}
		>
			<Text variant="bodyMedium" style={styles.text}>
				{t('unlockMoreFeaturesByLoggingIn')}
			</Text>
			<Button mode={'contained'} onPress={onPressLogin}>
				{t('login')}
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	main: {
		flexDirection: 'row',
		gap: 5,
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderTopWidth: 1,
	},
	text: { fontFamily: 'Rubik-SemiBold' },
});

export default LoginBar;
