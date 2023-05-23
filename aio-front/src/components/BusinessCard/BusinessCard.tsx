import { View, StyleSheet } from "react-native";
import { Image } from "../partials";
import { Card, Divider, Paragraph, Title } from "react-native-paper";
import { Business } from "../../services/business/business.types";
import { useTheme } from "../../contexts/ThemeContext";
import { useMemo } from "react";
import BottomActions from "./BottomActions";
import FavoriteButton from "../FavoriteButton";
import { navigate } from "../../routes/routerActions";
import StarRating from "../RatingStar";

type BusinessCardProps = {
	business: Business;
};

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
	const { name, description, rating, isFavorite } = business;

	const { theme, isThemeDark } = useTheme();

	const cardStyle = useMemo(() => {
		const { lightGrey } = theme.colors;

		if (isThemeDark) return styles.card;
		return [styles.card, { backgroundColor: "rgba(150, 150, 150, 0.12)" }];
	}, [isThemeDark, theme]);

	const handleCall = () => {};
	const handleWhatsApp = () => {};

	const handleSaveContact = () => {
		// logic to save contact
	};

	const handleShare = () => {
		// logic to share business
	};

	const onPressCard = () => {
		navigate("business");
	};

	return (
		<Card onPress={onPressCard} mode="elevated" style={cardStyle}>
			<Card.Content>
				<View style={styles.topRow}>
					<Image
						source={{
							uri: "https://img.freepik.com/premium-vector/store-retail-logo-template_59362-82.jpg?w=826",
						}}
						style={styles.image}
					/>
					<View style={styles.flex}>
						<View style={styles.titleRow}>
							<Title numberOfLines={2} style={styles.name}>
								{name}
							</Title>
							<FavoriteButton onPress={() => {}} isFavorite={isFavorite} />
						</View>
						<Paragraph style={styles.noMarginVertical}>
							<StarRating rating={rating} />
						</Paragraph>
						<Paragraph style={styles.noMarginVertical}>12:00 - 15:00</Paragraph>
						<Paragraph
							style={[styles.address, { color: theme.colors.primary }]}
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
	flex: { flex: 1 },
	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		flex: 1,
	},
	name: {
		marginRight: 15,
		maxWidth: "75%",
		paddingBottom: 0,
		marginBottom: 0,
	},
	noMarginVertical: { marginVertical: 0 },
	address: { textDecorationLine: "underline", marginVertical: 0 },
});

export default BusinessCard;
