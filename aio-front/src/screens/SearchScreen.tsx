import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

import useBusinesses from '../hooks/useBusinesses';
import BusinessList from '../sections/Home/BusinessList';

const SearchScreen = () => {
	const [query, setQuery] = useState('');

	const { data: businesses, isLoading, error } = useBusinesses({ query });

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
			<BusinessList
				data={businesses ?? []}
				style={styles.flex}
				keyboardDismissMode="on-drag"
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	flex: { flex: 1 },
	searchBar: {
		margin: 15,
	},
});

export default SearchScreen;
