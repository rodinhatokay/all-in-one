import { FC } from 'react';
import { BottomTabParams } from './types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
// import FavoritesScreen from '../screens/FavoritesScreen';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsScreen from '../screens/SettingsScreen';
import LocaleSelector from '../components/LocaleSelector/LocaleSelector';
// import { useLocalization } from '../contexts/LocalizationContext';
import { useAuth } from '../contexts/AuthContext';

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

const AuthRoutes: FC = () => {
	const { user } = useAuth();
	return (
		<BottomTabs.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarHideOnKeyboard: true,
			}}
		>
			<BottomTabs.Screen
				name="homeStack"
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<MaterialCommunityIcons
							name={focused ? 'home' : 'home-outline'}
							color={color}
							size={size}
						/>
					),
				}}
				component={HomeStackScreen}
			/>
			{/* <BottomTabs.Screen
				name="FavoritesTab"
				options={{
					headerShown: true,
					headerTitle: t("favorites"),

					tabBarShowLabel: false,
					tabBarIcon: ({ color, size, focused }) => (
						<MaterialCommunityIcons
							name={focused ? "heart" : "heart-outline"}
							color={color}
							size={size}
						/>
					),
				}}
				component={FavoritesScreen}
			/> */}
			<BottomTabs.Screen
				name="settingsTab"
				options={{
					headerShown: true,
					tabBarShowLabel: false,
					title: `${user?.firstName} ${user?.lastName}`,
					headerRight: () => <LocaleSelector />,

					tabBarIcon: ({ color, size, focused }) => (
						<IoniconsIcon
							name={focused ? 'cog' : 'cog-outline'}
							color={color}
							size={size}
						/>
					),
				}}
				component={SettingsScreen}
			/>
		</BottomTabs.Navigator>
	);
};

export default AuthRoutes;
