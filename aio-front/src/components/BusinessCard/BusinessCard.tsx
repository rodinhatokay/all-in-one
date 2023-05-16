import { View, StyleSheet } from "react-native";

import {
	Avatar,
	Button,
	Card,
	IconButton,
	Text,
	useTheme,
} from "react-native-paper";
import { Business } from "../../services/business/business.types";
import { FC } from "react";

interface Props {
	business: Business;
}

const LeftContent = (props: { size: number }) => (
	<Avatar.Image {...props} source={{ uri: "https://picsum.photos/700" }} />
);

const BusinessCard: FC<Props> = ({ business }) => {
	const theme = useTheme();
	return (
		<Card
			style={{ margin: 20, backgroundColor: theme.colors.elevation.level3 }}
			mode={"elevated"}
		>
			<Card.Title
				titleVariant="titleLarge"
				title={business.name}
				subtitleVariant="bodyMedium"
				subtitle={business.owner}
				left={LeftContent}
			/>
			<Card.Content>
				<Text variant="labelLarge">{business.description}</Text>
			</Card.Content>
			<View
				style={{
					marginHorizontal: 5,
					width: "100%",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<IconButton
					icon="phone"
					size={25}
					onPress={() => console.log("Pressed")}
				/>
				<IconButton
					icon="whatsapp"
					size={25}
					onPress={() => console.log("Pressed")}
				/>
				<IconButton
					icon="share"
					size={25}
					onPress={() => console.log("Pressed")}
				/>
			</View>
		</Card>
	);
};

const styles = StyleSheet.create({
	main: {
		borderWidth: 1,
	},
});

export default BusinessCard;
