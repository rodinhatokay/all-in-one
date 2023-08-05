import { Dimensions, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import SubCategoriesBusiness from '../SubCategoriesBusiness/SubCategoriesBusiness';
import { StyleSheet } from 'react-native';
// import useCategories from '../../../hooks/useCategories';
// import Loader from '../../../components/Loader/Loader';
import BusinessList from '../BusinessList';
import useBusinesses from '../../../hooks/useBusinesses';
import { Business } from '../../../services/business/business.types';
import { memo, useEffect, useMemo, useState } from 'react';

const Tab = createMaterialTopTabNavigator();

const initialLayout = {
	width: Dimensions.get('window').width,
};

const groupByCategoryId = (
	businesses: Business[],
): { [categoryId: string]: Business[] } => {
	return businesses.reduce(
		(groupedData: { [categoryId: string]: Business[] }, business) => {
			const categoryId = business.category?.id;

			if (categoryId !== undefined && categoryId !== null) {
				if (!groupedData[categoryId]) {
					groupedData[categoryId] = [];
				}
				groupedData[categoryId].push(business);
			}

			return groupedData;
		},
		{},
	);
};

const CategoriesBusiness = () => {
	const { data: businesses, isLoading } = useBusinesses();
	const [groupedData, setGroupedData] = useState<{
		[categoryId: string]: Business[];
	}>({});

	if (businesses && Object.keys(groupedData).length === 0) {
		const groupedBusinesses = groupByCategoryId(businesses);
		setGroupedData(groupedBusinesses);
	}

	if (isLoading || !businesses || Object.keys(groupedData).length === 0)
		return <></>;

	return (
		<View style={styles.main}>
			<Tab.Navigator
				screenOptions={{
					swipeEnabled: true,
					tabBarScrollEnabled: true,
				}}
				initialLayout={initialLayout}
			>
				{Object.entries(groupedData).map(([categoryId, businesses]) => {
					console.log('business for category', businesses);
					const { name } = businesses && businesses[0].category;

					// eslint-disable-next-line react/display-name
					const BusinessListComponent = memo(() => (
						<BusinessList data={businesses} />
					));

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

export default CategoriesBusiness;
