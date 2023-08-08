import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { Text, useTheme } from 'react-native-paper';
// import { SubCategory, categories } from '../../../mock/businsesses';
import BusinessList from '../../../components/BusinessList';
import { FC } from 'react';

const Tab = createMaterialTopTabNavigator();

interface Props {
	route?: {
		params?: { subCategories: any[] }; // params?: { subCategories: SubCategory[] };
	};
}

const initialLayout = {
	width: Dimensions.get('window').width,
};

const SubCategoriesBusiness: FC<Props> = (props) => {
	const subCategories = props?.route?.params?.subCategories ?? [];
	return (
		<Tab.Navigator
			screenOptions={{ tabBarScrollEnabled: true }}
			initialLayout={initialLayout}
		>
			{subCategories.map((subCategory) => {
				const Component = () => {
					return (
						<BusinessList
							key={subCategory.name}
							data={subCategory.businesses}
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

export default SubCategoriesBusiness;
