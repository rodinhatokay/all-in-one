import { FC } from "react";
import { HomeStack } from "./types";

import { NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./HomeStackScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import BottomIconsSet from "react-native-vector-icons/Feather";

type BottomTabParams = {
	HomeStack: NavigatorScreenParams<HomeStack>;
	FavoritesTab: undefined;
	ProfileTab: undefined;
};
// const Stack = createStackNavigator();

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

const AuthRoutes: FC = () => {
	return (
		<BottomTabs.Navigator screenOptions={{ headerShown: false }}>
			<BottomTabs.Screen
				name="HomeStack"
				options={{
					tabBarLabel: "Home",
					// tabBarShowLabel: false,
					tabBarIcon: ({ color, size }) => (
						<BottomIconsSet name="home" color={color} size={size} />
					),
				}}
				component={HomeStackScreen}
			/>
			<BottomTabs.Screen
				name="FavoritesTab"
				options={{
					tabBarLabel: "Favorites",
					tabBarShowLabel: false,
					tabBarIcon: ({ color, size }) => (
						<BottomIconsSet name="heart" color={color} size={size} />
					),
				}}
				component={FavoritesScreen}
			/>
			<BottomTabs.Screen
				name="ProfileTab"
				options={{
					tabBarLabel: "Profile",
					tabBarShowLabel: false,
					tabBarIcon: ({ color, size }) => (
						<BottomIconsSet name="user" color={color} size={size} />
					),
				}}
				component={FavoritesScreen}
			/>
		</BottomTabs.Navigator>
	);
};

export default AuthRoutes;
