import { View, StyleSheet, Pressable } from 'react-native';
import { Image } from '../partials';
import { Card, Divider } from 'react-native-paper';
import { Business } from '../../services/business/business.types';
import { useTheme } from '../../contexts/ThemeContext';
import { useMemo } from 'react';
import BottomActions from './BottomActions';
// import FavoriteButton from "../FavoriteButton";
// import StarRating from "../RatingStar";
import OpeningHours from './OpeningHours/OpeningHours';
import useBusinessActions from '../../hooks/useBusinessActions';
import { Text } from '../../components/partials/Text';

type BusinessCardProps = {
	business: Business;
};

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
	const { name, description } = business;
	const {
		handleCall,
		handleShare,
		navigateToBusiness,
		handleWhatsApp,
		handleSendSms,
		handleLocation,
	} = useBusinessActions(business);

	const { theme, isThemeDark } = useTheme();

	const cardStyle = useMemo(() => {
		// const { lightGrey } = theme.colors;

		if (isThemeDark) return styles.card;
		return [
			styles.card,
			// Platform.OS === "ios" && { backgroundColor: "rgba(150, 150, 150, 0.12)" },
		];
	}, [isThemeDark, theme]);

	return (
		<Card
			onPress={navigateToBusiness}
			disabled
			mode="elevated"
			style={cardStyle}
		>
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
							<Text
								variant="headlineSmall"
								numberOfLines={2}
								style={styles.name}
							>
								{name}
							</Text>
							{/* <FavoriteButton
								onPress={() => {
									throw new Error("need to implement");
								}}
								isFavorite={isFavorite}
							/> */}
						</View>
						<Text style={styles.description} variant="bodyMedium">
							{description}
						</Text>

						{/* <Paragraph style={styles.noMarginVertical}>
							<StarRating rating={rating} />
						</Paragraph> */}
						<OpeningHours openingHours={business.openingHours} />
						<Pressable onPress={handleLocation}>
							<Text style={[styles.address, { color: theme.colors.primary }]}>
								{business.address}
							</Text>
						</Pressable>
					</View>
				</View>
				<Divider />
			</Card.Content>
			<BottomActions
				hasWhatsapp={business.hasWhatsapp}
				handleCall={handleCall}
				handleSendSms={handleSendSms}
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
		flexDirection: 'row',
		marginBottom: 10,
	},
	image: {
		width: 90,
		height: 90,
		marginRight: 15,
		borderRadius: 50,
	},
	flex: { flex: 1, gap: 5 },
	titleRow: {
		// borderWidth: 1,
		// alignSelf: "flex-start",
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignItems: "center",
		// borderWidth: 1,
		// flex: 1,
	},
	name: {
		// borderWidth: 1,
		marginRight: 15,
		maxWidth: '75%',
		// fontSize: 14,
		paddingBottom: 0,
		marginBottom: 0,
		fontFamily: 'Rubik-Regular',
	},
	noMarginVertical: { marginVertical: 0 },
	address: {
		textDecorationLine: 'underline',
		marginVertical: 0,
		fontFamily: 'Rubik-Light',
	},
	description: {
		// textAlign: 'center',
		// paddingTop: 4,
		// fontFamily: 'Rubik-SemiBold',
	},
});

export default BusinessCard;
