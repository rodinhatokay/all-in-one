import { FlatList, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import { Business } from '../services/business/business.types';
import BusinessCard from '../components/BusinessCard/BusinessCard';
import EmptyFavorites from '../sections/Favorites/EmptyFavorites';
import useFavoriteBusinesses from '../hooks/useFavoriteBusinesses';

const FavoritesScreen = () => {
	const [loading, setLoading] = useState(true);

	const [favorites, setFavorites] = useState<Business[]>([]);

	const { getFavorites } = useFavoriteBusinesses();
	const renderItem = ({ item }: { item: Business }) => (
		<BusinessCard business={item} />
	);
	
	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			try {
				const response = await getFavorites();
				setFavorites(response);
			} catch (error) {
				// Handle error if necessary
			}
			setLoading(false);
		}

		fetchData();
	}, []);

	if (loading) return <Loader loadingScreen />;

	return (
		<View style={styles.flex}>
			<FlatList
				data={favorites}
				renderItem={renderItem}
				style={styles.flex}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={EmptyFavorites}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
});

export default FavoritesScreen;
