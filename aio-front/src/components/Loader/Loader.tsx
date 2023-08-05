import LottieView from 'lottie-react-native';
import { FC } from 'react';
import { StyleProp, StyleSheet, ViewStyle, Platform } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

interface Props {
	style?: StyleProp<ViewStyle>;
	loadingScreen?: boolean;
}

const Loader: FC<Props> = (props) => {
	if (Platform.OS === 'web') {
		return <ActivityIndicator size={'large'} />;
	}
	return (
		<LottieView
			source={require('../../../assets/lottieAnimations/infinity-loader.json')}
			style={[
				styles.lottieView,
				props.style,
				props.loadingScreen && styles.loadingScreen,
			]}
			autoPlay
			resizeMode="contain"
			loop
		/>
	);
};

const styles = StyleSheet.create({
	lottieView: { width: 250, height: 200 },

	loadingScreen: { alignSelf: 'center', marginTop: 50 },
});
export default Loader;
