import { Dimensions, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet } from 'react-native';
import BusinessList from '../../../components/BusinessList';
import { Business } from '../../../services/business/business.types';
import { FC, useCallback } from 'react';

const Tab = createMaterialTopTabNavigator();

const initialLayout = {
	width: Dimensions.get('window').width,
};

interface Props {
	categories: { [categoryId: string]: Business[] };
}

const BusinessCategories: FC<Props> = ({ categories }) => {
	return (
		<View style={styles.main}>
			<Tab.Navigator
				screenOptions={{
					swipeEnabled: true,
					tabBarScrollEnabled: true,
				}}
				initialLayout={initialLayout}
			>
				{Object.entries(categories).map(([, businesses]) => {
					const { name } = businesses && businesses[0].category;

					const BusinessListComponent = useCallback(
						() => <BusinessList data={businesses} />,
						[],
					);

					return (
						<Tab.Screen
							key={name}
							name={name}
							component={BusinessListComponent}
							options={{
								tabBarLabel: name,
							}}
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

export default BusinessCategories;
