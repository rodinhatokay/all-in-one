import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStack as HomeStackProps } from "./types";
import { View } from "react-native";
import { Text } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import HeaderLogo from "../sections/Home/HeaderLogo";
import SearchButton from "../sections/Home/SearchButton";
import { useLocalization } from "../contexts/LocalizationContext";
import SearchScreen from "../screens/SearchScreen";

const HomeStack = createNativeStackNavigator<HomeStackProps>();

const HomeStackScreen = () => {
	const { t } = useLocalization();

	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="home"
				options={{
					headerTitle: () => <View />,
					headerLeft: () => <HeaderLogo />,
					headerRight: () => <SearchButton />,
					title: t("home"),
				}}
				component={HomeScreen}
			/>
			<HomeStack.Screen
				name="business"
				options={{
					title: t("business"),
				}}
				component={Temp}
			/>
			<HomeStack.Screen
				name="search"
				options={{
					title: t("search"),
				}}
				component={SearchScreen}
			/>
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
