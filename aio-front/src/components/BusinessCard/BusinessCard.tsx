import { View, StyleSheet } from "react-native";

import { Card, Divider, Paragraph, Title } from "react-native-paper";
import { Business } from "../../services/business/business.types";
import Icon from "react-native-vector-icons/FontAwesome";
import { Image } from "expo-image";
import { useTheme } from "../../contexts/ThemeContext";
import { useMemo } from "react";
import BottomActions from "./BottomActions";
import FavoriteButton from "../FavoriteButton";
import { navigate } from "../../routes/routerActions";

type BusinessCardProps = {
	business: Business;
};

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
	const stars = [];
	for (let i = 1; i <= 5; i++) {
		stars.push(
			<Icon
				key={i}
				name={i <= rating ? "star" : "star-o"}
				color={i <= rating ? "#6D13FF" : "#808080"}
			/>
		);
	}
	return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
	const { name, description, rating, isFavorite } = business;

	const { theme, isThemeDark } = useTheme();

	const cardStyle = useMemo(() => {
		const { lightGrey } = theme.colors;

		if (isThemeDark) return styles.card;
		return [styles.card, { backgroundColor: lightGrey }];
	}, [isThemeDark, theme]);

	const handleCall = () => {};

	const handleWhatsApp = () => {};

	const handleSaveContact = () => {
		// logic to save contact
	};

	const handleShare = () => {
		// logic to share business
	};

	return (
		<Card
			onPress={() => {
				navigate("Business");
			}}
			style={cardStyle}
		>
			<Card.Content>
				<View style={styles.topRow}>
					<Image
						source={{
							uri: "https://img.freepik.com/premium-vector/store-retail-logo-template_59362-82.jpg?w=826",
						}}
						style={styles.image}
					/>
					<View style={{ flex: 1 }}>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								flex: 1,
							}}
						>
							<Title
								numberOfLines={2}
								style={{
									marginRight: 15,
									maxWidth: "75%",
									paddingBottom: 0,
									marginBottom: 0,
								}}
							>
								{name}
							</Title>
							<FavoriteButton onPress={() => {}} isFavorite={isFavorite} />
						</View>
						<Paragraph style={{ marginVertical: 0 }}>
							<StarRating rating={rating} />
						</Paragraph>
						<Paragraph style={{ marginVertical: 0 }}>12:00 - 15:00</Paragraph>
						<Paragraph
							style={[
								styles.address,
								{ color: theme.colors.primary, marginVertical: 0 },
							]}
						>
							hatokay 5
						</Paragraph>
					</View>
				</View>
				<Divider />

				<Paragraph>{description}</Paragraph>
			</Card.Content>
			<BottomActions
				handleCall={handleCall}
				handleSaveContact={handleSaveContact}
				handleShare={handleShare}
				handleWhatsApp={handleWhatsApp}
			/>
		</Card>
	);
};

const styles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 10,
	},
	topRow: {
		flexDirection: "row",
		marginBottom: 10,
	},
	image: {
		width: 100,
		height: 100,
		marginRight: 10,
	},

	address: { textDecorationLine: "underline" },
});

export default BusinessCard;
