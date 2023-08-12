import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

import useBusinesses from '../hooks/useBusinesses';
import BusinessList from '../components/BusinessList';
import { Business } from '../services/business/business.types';

const SearchScreen = () => {
	const [query, setQuery] = useState('');

	const { data: businesses, error } = useBusinesses();
	const [filteredBusinesses, setFilteredBusinesses] = useState<
		Business[] | undefined
	>(businesses);
	console.log('error', error);

	const handleChangeText = (text: string) => {
		const filteredBusinesses = businesses?.filter((business: Business) => {
			const businessName = business.name.toLowerCase();
			// const businessCategory = business.category.toLowerCase();
			const searchTerm = text.toLowerCase();

			// Search by business name or category
			return businessName.includes(searchTerm);
			// businessCategory.includes(searchTerm)
		});

		setFilteredBusinesses(filteredBusinesses);
		setQuery(text);
	};

	return (
		<View style={styles.flex}>
			<Searchbar
				style={styles.searchBar}
				placeholder="Search by business or category" // this is temporary until
				onChangeText={handleChangeText}
				value={query}
				autoFocus
			/>
			<BusinessList
				data={filteredBusinesses ?? []}
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
