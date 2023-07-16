import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	Easing,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Octicons";
type Props = {
	status: "down" | "up";
	size?: number;
	color?: string;
	onClick?: () => void;
};

const DropDownIcon: React.FC<Props> = ({ status, onClick, size, color }) => {
	const rotation = useSharedValue(0);

	useEffect(() => {
		rotation.value = withTiming(status === "up" ? 0 : 1, {
			duration: 200,
			easing: Easing.linear,
		});
	}, [status, rotation]);

	const animatedStyles = useAnimatedStyle(() => {
		return {
			transform: [
				{
					rotate: `${rotation.value * 180}deg`,
				},
			],
		};
	});

	return (
		<TouchableOpacity onPress={onClick}>
			<Animated.View style={animatedStyles}>
				<Icon name="chevron-down" size={size ?? 18} color={color ?? "black"} />
			</Animated.View>
		</TouchableOpacity>
	);
};

export default DropDownIcon;
