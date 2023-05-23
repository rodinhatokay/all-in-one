import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { memo } from "react";

interface Props {
	size?: number;
	/**
	 * 1 - 5
	 */
	rating: number;
}

const StarRating: React.FC<Props> = ({ rating, size }) => {
	const stars = [];
	for (let i = 1; i <= 5; i++) {
		stars.push(
			<Icon
				key={i}
				name={i <= rating ? "star" : "star-o"}
				color={i <= rating ? "#CFB53B" : "#808080"}
				size={size}
			/>
		);
	}
	return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
	container: { flexDirection: "row" },
});

export default memo(StarRating);
