import { FC } from "react";
import { HomeStack } from "./types";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./HomeStackScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

type BottomTabParams = {
	HomeStack: NavigatorScreenParams<HomeStack>;
	FavoritesTab: undefined;
	SettingsTab: undefined;
};

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

const AuthRoutes: FC = () => {
	return (
		<BottomTabs.Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarHideOnKeyboard: true,
			}}
		>
			<BottomTabs.Screen
				name="HomeStack"
				options={{
					tabBarIcon: ({ color, size, focused }) => (
						<MaterialCommunityIcons
							name={focused ? "home" : "home-outline"}
							color={color}
							size={size}
						/>
					),
				}}
				component={HomeStackScreen}
			/>
			<BottomTabs.Screen
				name="FavoritesTab"
				options={{
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
			/>
			<BottomTabs.Screen
				name="SettingsTab"
				options={{
					tabBarShowLabel: false,
					tabBarIcon: ({ color, size, focused }) => (
						<IoniconsIcon
							name={focused ? "cog" : "cog-outline"}
							color={color}
							size={size}
						/>
					),
				}}
				component={FavoritesScreen}
			/>
		</BottomTabs.Navigator>
	);
};

export default AuthRoutes;
