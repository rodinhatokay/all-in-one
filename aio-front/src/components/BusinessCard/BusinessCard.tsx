import { View, StyleSheet, Pressable } from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { Business } from '../../services/business/business.types';
import { useTheme } from '../../contexts/ThemeContext';
import { memo, useMemo } from 'react';
import BottomActions from './BottomActions';
import FavoriteButton from '../FavoriteButton';
// import StarRating from "../RatingStar";
import OpeningHours from './OpeningHours/OpeningHours';
import useBusinessActions from '../../hooks/useBusinessActions';
import { Text } from '../../components/partials/Text';
import LogoImage from '../LogoImage/LogoImage';
import { useBusinessFavorites } from '../../contexts/BusinessFavoritesContext';
import { useAuth } from '../../contexts/AuthContext';

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
	const { isAuthenticated } = useAuth();

	const { businessFavoriteIds, toggleFavoriteBusiness } =
		useBusinessFavorites();

	const cardStyle = useMemo(() => {
		if (isThemeDark) return styles.card;
		return { ...styles.card, backgroundColor: theme.colors.card };
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
					<LogoImage logoPath={business.logoPath} altText={business.name} />

					<View style={styles.flex}>
						<View style={styles.titleRow}>
							<Text variant="titleLarge" numberOfLines={2} style={styles.name}>
								{name}
							</Text>
							{isAuthenticated && (
								<FavoriteButton
									onPress={() => toggleFavoriteBusiness(business)}
									isFavorite={businessFavoriteIds.has(business.id)}
								/>
							)}
						</View>
						<Text variant="labelMedium">{description}</Text>
						{/* <Paragraph style={styles.noMarginVertical}>
							<StarRating rating={rating} />
						</Paragraph> */}
						<OpeningHours openingHours={business.openingHours} />
						<Pressable onPress={handleLocation}>
							<Text
								variant="labelMedium"
								style={[styles.address, { color: theme.colors.primary }]}
							>
								{business.address}
							</Text>
						</Pressable>
						{/* <Divider /> */}
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
	},
	noMarginVertical: { marginVertical: 0 },
	address: {
		textDecorationLine: 'underline',
		marginVertical: 0,
		fontFamily: 'Rubik-Bold',
	},
	description: {
		textAlign: 'center',
		// paddingTop: 4,
		// fontFamily: 'Rubik-SemiBold',
	},
});

export default memo(BusinessCard);
