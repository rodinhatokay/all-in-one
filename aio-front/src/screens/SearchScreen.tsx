import { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Business } from '../services/business/business.types';
import BusinessCard from '../components/BusinessCard/BusinessCard';
import useBusinesses from '../hooks/useBusinesses';

const SearchScreen = () => {
	const [query, setQuery] = useState('');

	const {
		data: businesses,
		isLoading,
		error,
	} = useBusinesses({ query });

	console.log('error', error);

	const renderItem = ({ item }: { item: Business }) => (
		<BusinessCard business={item} />
	);

	return (
		<View style={styles.flex}>
			<Searchbar
				style={styles.searchBar}
				placeholder="Search by business or category" // this is temporary until
				onChangeText={setQuery}
				value={query}
				loading={isLoading}
				autoFocus
			/>
			<FlatList
				data={businesses ?? []}
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
