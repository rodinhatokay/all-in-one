import React, { FC } from "react";
import { HomeStack } from "./types";

import { NavigatorScreenParams } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "./HomeStackScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

type BottomTabParams = {
	HomeStack: NavigatorScreenParams<HomeStack>;
	FavoritesTab: undefined;
};
// const Stack = createStackNavigator();

const BottomTabs = createBottomTabNavigator<BottomTabParams>();

const Routes: FC = () => {
	return (
		<BottomTabs.Navigator screenOptions={{ headerShown: false }}>
			<BottomTabs.Screen name="HomeStack" component={HomeStackScreen} />
			<BottomTabs.Screen name="FavoritesTab" component={FavoritesScreen} />
		</BottomTabs.Navigator>
	);
};

export default Routes;
