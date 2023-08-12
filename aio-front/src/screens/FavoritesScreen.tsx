import { View } from 'react-native';
import { StyleSheet } from 'react-native';
// import Loader from '../components/Loader/Loader';
import EmptyFavorites from '../sections/Favorites/EmptyFavorites';
import BusinessList from '../components/BusinessList';
import { useBusinessFavorites } from '../contexts/BusinessFavoritesContext';

const FavoritesScreen = () => {
	const { favoritesQuery } = useBusinessFavorites();
	const { data: favoritesList, isLoading } = favoritesQuery;

	if (isLoading) return null;

	return (
		<View style={styles.flex}>
			<BusinessList
				data={favoritesList}
				style={styles.flex}
				ListEmptyComponent={EmptyFavorites}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
});

export default FavoritesScreen;
