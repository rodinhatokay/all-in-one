import { Dimensions, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { categories } from "../../../mock/businsesses";
import BusinessSubCategories from "../BusinessSubCategories/BusinessSubCategories";

const Tab = createMaterialTopTabNavigator();

const initialLayout = {
	width: Dimensions.get("window").width,
};

const BusinessCategories = () => {
	return (
		<View style={{ flex: 1 }}>
			<Tab.Navigator
				screenOptions={{
					swipeEnabled: false,
				}}
				initialLayout={initialLayout}
			>
				{categories.map((category) => {
					return (
						<Tab.Screen
							key={category.name}
							name={category.name}
							component={BusinessSubCategories}
							options={{
								tabBarLabel: category.name,
							}}
							initialParams={{ subCategories: category.subCategories }}
						/>
					);
				})}
			</Tab.Navigator>
		</View>
	);
};

export default BusinessCategories;
