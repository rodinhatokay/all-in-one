import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
const Loader = () => {
	return (
		<LottieView
			source={require("../../../assets/lottieAnimations/infinity-loader.json")}
			style={styles.lottieView}
			autoPlay
			resizeMode="contain"
			loop
		/>
	);
};

const styles = StyleSheet.create({
	lottieView: { width: 250, height: 200, alignSelf: "center", marginTop: 50 },
});
export default Loader;
