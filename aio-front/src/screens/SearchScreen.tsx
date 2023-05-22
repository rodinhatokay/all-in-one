import { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { Business } from "../services/business/business.types";
import BusinessCard from "../components/BusinessCard/BusinessCard";
import { categories } from "../mock/businsesses";

const SearchScreen = () => {
	const [loading, setIsLoading] = useState(false);
	const [searchResult, setSearchResult] = useState<Business[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const onChangeSearch = async (query: string) => {
		setSearchQuery(query);
		if (!query) {
			setSearchResult([]);
			return;
		}
		setIsLoading(true);
		try {
			// Simulate API call
			setSearchResult(categories[0].subCategories[0].businesses);
			await new Promise((resolve) => setTimeout(resolve, 1000));
		} catch (error) {
			console.error("Error occurred during search:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const renderItem = ({ item }: { item: Business }) => (
		<BusinessCard business={item} />
	);

	return (
		<View style={styles.flex}>
			<Searchbar
				style={styles.searchBar}
				placeholder="Search by business or category" // this is temporary until
				onChangeText={onChangeSearch}
				value={searchQuery}
				loading={loading}
				autoFocus
			/>
			<FlatList
				data={searchResult}
				style={styles.flex}
				keyboardDismissMode="on-drag"
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
	searchBar: {
		margin: 15,
		// height:
	},
});

export default SearchScreen;
