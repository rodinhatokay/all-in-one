import { View, StyleSheet, SafeAreaView } from 'react-native';
import Loader from '../components/Loader/Loader';
import BusinessList from '../components/BusinessList';
import useBusinesses from '../hooks/useBusinesses';
import { useAuth } from '../contexts/AuthContext';
import LoginBar from '../components/LoginBar/LoginBar';

const HomeScreen = () => {
	const {
		data: businesses,
		isLoading,
		refetch,
		isRefetching,
	} = useBusinesses();
	const { isAuthenticated } = useAuth();

	const businessCategories = useMemo(() => {
		return groupByCategoryId(businesses);
	}, [businesses]);

	if (isLoading || !businesses) return <Loader style={styles.loader} />;

	return (
		<SafeAreaView style={styles.main}>
			<BusinessList
				data={businesses}
				onRefresh={refetch}
				refreshing={isRefetching}
			/>
			{!isAuthenticated && <LoginBar />}
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	main: { flex: 1 },
	loader: { alignSelf: 'center', marginTop: 50 },
});

export default HomeScreen;
