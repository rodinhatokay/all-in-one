import LottieView from "lottie-react-native";
import { FC, useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

interface Props {
	style?: StyleProp<ViewStyle>;
}

const Loader: FC<Props> = (props) => {
	return (
		<LottieView
			source={require("../../../assets/lottieAnimations/infinity-loader.json")}
			style={[styles.lottieView, props.style]}
			autoPlay
			resizeMode="contain"
			loop
		/>
	);
};

const styles = StyleSheet.create({
	lottieView: { width: 250, height: 200 },
});
export default Loader;
