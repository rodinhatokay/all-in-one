import { View, StyleSheet } from 'react-native';
import Loader from '../components/Loader/Loader';
import BusinessList from '../sections/Home/BusinessList';
import useBusinesses from '../hooks/useBusinesses';
import CategoriesBusiness from '../sections/Home/CategoriesBusiness/CategoriesBusiness';

const HomeScreen = () => {
	const {
		data: businesses,
		isLoading,
		refetch,
		isRefetching,
	} = useBusinesses();

	if (isLoading || !businesses) return <Loader style={styles.loader} />;

	return (
		<View style={styles.main}>
			{/* <BusinessList
				data={businesses}
				onRefresh={refetch}
				refreshing={isRefetching}
			/> */}
			<CategoriesBusiness />
		</View>
	);
};
const styles = StyleSheet.create({
	main: { flex: 1 },
	loader: { alignSelf: 'center', marginTop: 50 },
});

export default HomeScreen;
