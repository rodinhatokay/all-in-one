import { FlatList, FlatListProps } from 'react-native';
import { Business } from '../services/business/business.types';
import { FC, memo, useCallback } from 'react';
import BusinessCard from './BusinessCard/BusinessCard';
import { StyleSheet } from 'react-native';

interface Props extends Partial<FlatListProps<Business>> {
	refreshing?: boolean;
	onRefresh?: VoidFunction;
	data?: Business[] | null;
}

const BusinessList: FC<Props> = ({ data, refreshing, onRefresh, ...props }) => {
	const renderItem = useCallback(
		({ item }: { item: Business }) => <BusinessCard business={item} />,
		[],
	);
	const keyExtractor = useCallback((item: Business) => item.id, []);

	return (
		<FlatList
			refreshing={refreshing}
			onRefresh={onRefresh}
			data={data ?? []}
			style={styles.main}
			renderItem={renderItem}
			keyExtractor={keyExtractor}
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	main: { flex: 1 },
});

export default memo(BusinessList);
