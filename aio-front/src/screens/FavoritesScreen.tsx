import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { Business } from "../services/business/business.types";
import BusinessCard from "../components/BusinessCard/BusinessCard";
import EmptyFavorites from "../sections/Favorites/EmptyFavorites";
import { favoriteBusinesses } from "../mock/businsesses";

const FavoritesScreen = () => {
	const [loading, setLoading] = useState(true);

	const [favorites, setFavorites] = useState<Business[]>(favoriteBusinesses);

	const renderItem = ({ item }: { item: Business }) => (
		<BusinessCard business={item} />
	);

	useEffect(() => {
		// temp for ui
		// fetch favorites here..
		setTimeout(() => {
			setLoading(false);
		}, 1500);
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
