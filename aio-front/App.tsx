import { Provider as PaperProvider } from 'react-native-paper';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import Router from './src/routes/Router';
import { AuthProvider } from './src/contexts/AuthContext';
import { LocalizationProvider } from './src/contexts/LocalizationContext';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Platform, UIManager, View, StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { BusinessFavoritesProvider } from './src/contexts/BusinessFavoritesContext';

if (Platform.OS === 'android') {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

const queryClient = new QueryClient();

const App = () => {
	const { theme, isThemeDark } = useTheme();

	const wrapperStyles = useMemo(() => {
		return {
			backgroundColor: theme.colors.elevation.level5,
			flex: 1,
		};
	}, [theme]);

	return (
		<BusinessFavoritesProvider>
			<PaperProvider theme={theme}>
				<View style={wrapperStyles}>
					<View style={styles.container}>
						<StatusBar style={isThemeDark ? 'light' : 'dark'} />
						<Router />
					</View>
				</View>
			</PaperProvider>
		</BusinessFavoritesProvider>
	);
};

const AppWrapper = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<LocalizationProvider>
					<ThemeProvider>
						<App />
					</ThemeProvider>
				</LocalizationProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...Platform.select({
			web: {
				width: 375,
				alignSelf: 'center',
			},
		}),
	},
});
export default AppWrapper;
