import { Dimensions, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, useTheme } from "react-native-paper";
import { SubCategory, categories } from "../../../mock/businsesses";
import BusinessList from "../BusinessList";
import { FC } from "react";

const Tab = createMaterialTopTabNavigator();

interface Props {
	route?: {
		params?: { subCategories: SubCategory[] };
	};
}

const initialLayout = {
	width: Dimensions.get("window").width,
};

const BusinessSubCategories: FC<Props> = (props) => {
	const subCategories = props?.route?.params?.subCategories ?? [];
	const theme = useTheme();
	return (
		<Tab.Navigator
			screenOptions={{ tabBarScrollEnabled: true }}
			// sceneContainerStyle={{ backgroundColor: theme. }}
			initialLayout={initialLayout}
		>
			{subCategories.map((subCategory) => {
				const Component = () => {
					return (
						<BusinessList
							key={subCategory.name}
							businesses={subCategory.businesses}
						/>
					);
				};
				return (
					<Tab.Screen
						key={subCategory.name}
						name={subCategory.name}
						component={Component}
					/>
				);
			})}
		</Tab.Navigator>
	);
};

export default BusinessSubCategories;
