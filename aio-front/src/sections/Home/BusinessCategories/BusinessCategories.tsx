import { Dimensions, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import SubCategoriesBusiness from '../SubCategoriesBusiness/SubCategoriesBusiness';
import { StyleSheet } from 'react-native';
// import useCategories from '../../../hooks/useCategories';
// import Loader from '../../../components/Loader/Loader';
import BusinessList from '../BusinessList';
import useBusinesses from '../../../hooks/useBusinesses';
import { Business } from '../../../services/business/business.types';
import { FC, useCallback, useState } from 'react';

const Tab = createMaterialTopTabNavigator();

const initialLayout = {
	width: Dimensions.get('window').width,
};

interface Props {
	categories: { [categoryId: string]: Business[] };
}

const BusinessCategories: FC<Props> = ({ categories }) => {
	// const { data: businesses, isLoading } = useBusinesses();
	// const [groupedData, setGroupedData] = useState<{
	// 	[categoryId: string]: Business[];
	// }>({});

	// if (businesses && Object.keys(groupedData).length === 0) {
	// 	const groupedBusinesses = groupByCategoryId(businesses);
	// 	setGroupedData(groupedBusinesses);
	// }

	// if (isLoading || !businesses || Object.keys(groupedData).length === 0)
	// 	return <></>;

	return (
		<View style={styles.main}>
			<Tab.Navigator
				screenOptions={{
					swipeEnabled: true,
					tabBarScrollEnabled: true,
				}}
				initialLayout={initialLayout}
			>
				{Object.entries(categories).map(([categoryId, businesses]) => {
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
