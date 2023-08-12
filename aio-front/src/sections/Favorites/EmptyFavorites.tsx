import { StyleSheet, View, Platform } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { Text } from 'react-native-paper';
import { useLocalization } from '../../contexts/LocalizationContext';

const EmptyFavorites = () => {
	const { t } = useLocalization();
	return (
		<View style={styles.emptyListContainer}>
			<Text variant="titleMedium">{t('noFavoritesYetStartAddingSome')}</Text>
			{Platform.OS !== 'web' && (
				<AnimatedLottieView
					style={styles.lottieView}
					source={require('../../../assets/lottieAnimations/empty.json')}
					autoPlay
					loop
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	emptyListContainer: {
		alignItems: 'center',
		marginTop: 100,
	},
	lottieView: {
		width: 200,
		height: 200,
	},
});

export default EmptyFavorites;
