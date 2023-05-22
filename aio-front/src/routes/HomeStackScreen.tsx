import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStack as HomeStackProps } from "./types";
import { View } from "react-native";
import { Text } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import HeaderLogo from "../sections/Home/HeaderLogo";
import SearchButton from "../sections/Home/SearchButton";
import { useLocalization } from "../contexts/LocalizationContext";

const HomeStack = createNativeStackNavigator<HomeStackProps>();

const HomeStackScreen = () => {
	const { t } = useLocalization();

	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="Home"
				options={{
					headerTitle: () => <View />,
					headerLeft: () => <HeaderLogo />,
					headerRight: () => <SearchButton />,
					title: t("Home"),
				}}
				component={HomeScreen}
			/>
			<HomeStack.Screen
				name="Business"
				options={{
					title: t("Business"),
				}}
				component={Temp}
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
