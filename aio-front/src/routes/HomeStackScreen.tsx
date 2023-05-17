import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStack as HomeStackProps } from "./types";
import { View } from "react-native";
import { Text } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import Loader from "../components/Loader/Loader";
import { Image } from "expo-image";
import { useTheme } from "../contexts/ThemeContext";

const HomeStack = createNativeStackNavigator<HomeStackProps>();

const HomeStackScreen = () => {
	const { theme } = useTheme();

	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name="Home"
				options={{
					headerTitle: ({ children }) => {
						return <View></View>;
					},
					headerLeft: (props) => {
						return (
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Image
									source={require("../../assets/images/logo.png")}
									style={{
										height: 50,
										width: 50,
										tintColor: theme.colors.primary,
										marginLeft: 5,
									}}
								/>
								<Text style={{ fontSize: 25 }}>AiO</Text>
								{/* <Loader style={{ height: 50, width: 50 }} /> */}
							</View>
						);
					},
					headerRight: (props) => {
						return (
							<View>
								<Text>search</Text>
							</View>
						);
					},
				}}
				component={HomeScreen}
			/>
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
