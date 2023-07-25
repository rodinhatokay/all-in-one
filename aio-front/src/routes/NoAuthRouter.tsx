import { FC } from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NoAuthStack } from './types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegsiterScreen';
import { useLocalization } from '../contexts/LocalizationContext';

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator<NoAuthStack>();

const NoAuthRouter: FC = () => {
	const { t } = useLocalization();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="login"
				options={{ title: 'שלום' }}
				component={LoginScreen}
			/>
			<Stack.Screen
				name="register"
				options={{ headerShown: true, title: t('register') }}
				component={RegisterScreen}
			/>
		</Stack.Navigator>
	);
};

export default NoAuthRouter;
