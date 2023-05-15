import { FC } from "react";
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NoAuthStack } from "./types";
import LoginScreen from "../screens/LoginScreen";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator<NoAuthStack>();

const NoAuthRouter: FC = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="Login"
				options={{ title: "שלום" }}
				component={LoginScreen}
			/>
			<Stack.Screen name="Register" component={LoginScreen} />
		</Stack.Navigator>
	);
};

export default NoAuthRouter;
