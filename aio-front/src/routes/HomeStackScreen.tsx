import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStack as HomeStackProps } from "./types";
import { View, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";

const HomeStack = createNativeStackNavigator<HomeStackProps>();

const HomeStackScreen = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name="Home" component={HomeScreen} />
			<HomeStack.Screen name="Business" component={Temp} />
		</HomeStack.Navigator>
	);
};

const Temp = () => {
	return (
		<View>
			<Text>hello</Text>
		</View>
	);
};

export default HomeStackScreen;
