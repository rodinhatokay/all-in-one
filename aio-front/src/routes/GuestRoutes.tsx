import { FC } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GuestRoute } from './types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegsiterScreen';
import { useLocalization } from '../contexts/LocalizationContext';
import HomeStackScreen from './HomeStackScreen';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator<GuestRoute>();

const GuestRoutes: FC = () => {
	const { t } = useLocalization();
	return (
		<Stack.Navigator
			// screenOptions={{
			// 	headerShown: false,
			// }}
			initialRouteName="homeStack"
		>
			<Stack.Screen
				name="login"
				options={{ title: t('login'), headerShown: true }}
				component={LoginScreen}
			/>
			<Stack.Screen
				name="register"
				options={{ headerShown: true, title: t('register') }}
				component={RegisterScreen}
			/>
			<Stack.Screen
				name="homeStack"
				options={{ headerShown: false, title: t('home') }}
				component={HomeStackScreen}
			/>
		</Stack.Navigator>
	);
};

export default GuestRoutes;
