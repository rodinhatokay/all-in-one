import { FlatList } from 'react-native';
import { Business } from '../../services/business/business.types';
import { FC } from 'react';
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import { StyleSheet } from 'react-native';

interface Props {
	businesses: Business[];
	refreshing?: boolean;
	onRefresh?: VoidFunction;
}

const BusinessList: FC<Props> = ({ businesses, refreshing, onRefresh }) => {
	const renderItem = ({ item }: { item: Business }) => (
		<BusinessCard business={item} />
	);

	return (
		<FlatList
			refreshing={refreshing}
			onRefresh={onRefresh}
			data={businesses}
			style={styles.main}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
		/>
	);
};

const styles = StyleSheet.create({
	main: { flex: 1 },
});

export default BusinessList;
