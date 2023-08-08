import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Loader from '../components/Loader/Loader';
import { Business } from '../services/business/business.types';
import BusinessCard from '../components/BusinessCard/BusinessCard';
import EmptyFavorites from '../sections/Favorites/EmptyFavorites';
import BusinessList from '../components/BusinessList';
import { useBusinessFavorites } from '../contexts/BusinessFavoritesContext';

const FavoritesScreen = () => {
	const { favoritesQuery } = useBusinessFavorites();
	const { data: favoritesList, isLoading } = favoritesQuery;
	const renderItem = ({ item }: { item: Business }) => (
		<BusinessCard business={item} />
	);

	if (isLoading) return <Loader loadingScreen />;

	return (
		<View style={styles.flex}>
			<BusinessList
				data={favoritesList}
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
