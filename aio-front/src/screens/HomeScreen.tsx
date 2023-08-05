import { View, StyleSheet } from 'react-native';
import Loader from '../components/Loader/Loader';
import BusinessList from '../sections/Home/BusinessList';
import useBusinesses from '../hooks/useBusinesses';
import BusinessCategories from '../sections/Home/BusinessCategories/BusinessCategories';
import { useMemo } from 'react';
import { Business } from '../services/business/business.types';

const groupByCategoryId = (
	businesses?: Business[],
): { [categoryId: string]: Business[] } => {
	if (!businesses) return {};
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

const HomeScreen = () => {
	const {
		data: businesses,
		isLoading,
		refetch,
		isRefetching,
	} = useBusinesses();

	const businessCategories = useMemo(() => {
		return groupByCategoryId(businesses);
	}, [businesses]);

	if (isLoading || !businesses) return <Loader style={styles.loader} />;

	return (
		<View style={styles.main}>
			{/* <BusinessList
				data={businesses}
				onRefresh={refetch}
				refreshing={isRefetching}
			/> */}
			<BusinessCategories categories={businessCategories} />
		</View>
	);
};
const styles = StyleSheet.create({
	main: { flex: 1 },
	loader: { alignSelf: 'center', marginTop: 50 },
});

export default HomeScreen;
