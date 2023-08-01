import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import NoAuthRouter from './NoAuthRouter';
import { navigationRef } from './routerActions';
import AuthRoutes from './AuthRoutes';
import { useAuth } from '../contexts/AuthContext';
import * as SplashScreen from 'expo-splash-screen';
import useInitApp from '../hooks/useInitApp';
import { useCallback } from 'react';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

SplashScreen.preventAutoHideAsync();

/**
 * router handler
 */
const Router = () => {
	const { theme } = useTheme();
	const { isAuthenticated } = useAuth();
	const { appIsReady } = useInitApp();

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	return (
		<View style={styles.main}>
			<NavigationContainer
				onReady={onLayoutRootView}
				theme={theme}
				ref={navigationRef}
				linking={{
					prefixes: [
						prefix,
						'http://wwww.allinoneocean.com',
						'https://wwww.allinoneocean.com',
					],
					config: {
						screens: {
							settingsTab: 'settings',
						},
					},
				}}
			>
				{isAuthenticated ? <AuthRoutes /> : <NoAuthRouter />}
			</NavigationContainer>
		</View>
	);
};

const styles = StyleSheet.create({
	main: { flex: 1 },
});

export default Router;
