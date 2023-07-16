import { FC } from "react";
import { HomeStack } from "./types";
import { NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./HomeStackScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import SettingsScreen from "../screens/SettingsScreen";
import LocaleSelector from "../components/LocaleSelector/LocaleSelector";
import { useLocalization } from "../contexts/LocalizationContext";

type BottomTabParams = {
	HomeStack: NavigatorScreenParams<HomeStack>;
	FavoritesTab: undefined;
	SettingsTab: undefined;
};

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

const AuthRoutes: FC = () => {
	const { t } = useLocalization();
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
				name="SettingsTab"
				options={{
					headerShown: true,
					tabBarShowLabel: false,
					title: "John Doe",
					headerRight: () => <LocaleSelector />,

					tabBarIcon: ({ color, size, focused }) => (
						<IoniconsIcon
							name={focused ? "cog" : "cog-outline"}
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
