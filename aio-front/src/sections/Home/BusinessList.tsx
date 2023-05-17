import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { Business } from "../../services/business/business.types";
import { FC } from "react";
import BusinessCard from "../../components/BusinessCard/BusinessCard";

interface Props {
	businesses: Business[];
}

const BusinessList: FC<Props> = ({ businesses }) => {
	const renderItem = ({ item }: { item: Business }) => (
		<BusinessCard business={item} />
	);

	return (
		<FlatList
			data={businesses}
			style={{ flex: 1 }}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default BusinessList;
