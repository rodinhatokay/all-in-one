import { View, StyleSheet, Platform } from "react-native";
import { Image } from "../partials";
import { Card, Divider, Paragraph, Title } from "react-native-paper";
import { Business } from "../../services/business/business.types";
import { useTheme } from "../../contexts/ThemeContext";
import { useMemo } from "react";
import BottomActions from "./BottomActions";
import FavoriteButton from "../FavoriteButton";
import { navigate } from "../../routes/routerActions";
import StarRating from "../RatingStar";
import OpeningHours from "./OpeningHours";

type BusinessCardProps = {
	business: Business;
};

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
	const { name, description } = business;

	const { theme, isThemeDark } = useTheme();

	const cardStyle = useMemo(() => {
		// const { lightGrey } = theme.colors;

		if (isThemeDark) return styles.card;
		return [
			styles.card,
			Platform.OS === "ios" && { backgroundColor: "rgba(150, 150, 150, 0.12)" },
		];
	}, [isThemeDark, theme]);

	const handleCall = () => {
		throw new Error("need to implement");
	};
	const handleWhatsApp = () => {
		throw new Error("need to implement");
	};

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
		<Card onPress={onPressCard} disabled mode="elevated" style={cardStyle}>
			<Card.Content>
				<View style={styles.topRow}>
					<Image
						source={{
							uri: business.logoPath,
						}}
						style={styles.image}
					/>
					<View style={styles.flex}>
						<View style={styles.titleRow}>
							<Title numberOfLines={2} style={styles.name}>
								{name}
							</Title>
							{/* <FavoriteButton
								onPress={() => {
									throw new Error("need to implement");
								}}
								isFavorite={isFavorite}
							/> */}
						</View>
						{/* <Paragraph style={styles.noMarginVertical}>
							<StarRating rating={rating} />
						</Paragraph> */}
						<OpeningHours openingHours={business.openingHours} />
						<Paragraph
							style={[styles.address, { color: theme.colors.primary }]}
						>
							{business.address}
						</Paragraph>
					</View>
				</View>
				<Divider />
				<Paragraph>{description}</Paragraph>
			</Card.Content>
			<BottomActions
				hasWhatsapp={business.hasWhatsapp}
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
		// borderWidth: 1,
		// alignSelf: "flex-start",
		flexDirection: "row",
		justifyContent: "space-between",
		// alignItems: "center",
		flex: 1,
	},
	name: {
		// borderWidth: 1,
		marginRight: 15,
		maxWidth: "75%",
		// fontSize: 14,
		paddingBottom: 0,
		marginBottom: 0,
	},
	noMarginVertical: { marginVertical: 0 },
	address: { textDecorationLine: "underline", marginVertical: 0 },
});

export default BusinessCard;
