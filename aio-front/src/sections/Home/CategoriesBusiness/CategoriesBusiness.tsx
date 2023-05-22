import { Dimensions, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { categories } from "../../../mock/businsesses";
import SubCategoriesBusiness from "../SubCategoriesBusiness/SubCategoriesBusiness";
import { StyleSheet } from "react-native";

const Tab = createMaterialTopTabNavigator();

const initialLayout = {
	width: Dimensions.get("window").width,
};

const CategoriesBusiness = () => {
	return (
		<View style={styles.main}>
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
							component={SubCategoriesBusiness}
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

const styles = StyleSheet.create({
	main: { flex: 1 },
});

export default CategoriesBusiness;
