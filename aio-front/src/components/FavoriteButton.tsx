import { FC, useCallback } from "react";
import Animated, {
	useSharedValue,
	withSpring,
	useAnimatedStyle,
	Extrapolate,
	interpolate,
} from "react-native-reanimated";
import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useTheme } from "../contexts/ThemeContext";

interface Props {
	onPress?: VoidFunction;
	isFavorite: boolean;
	size?: number;
}

const FavoriteButton: FC<Props> = (props) => {
	const liked = useSharedValue(props.isFavorite ? 1 : 0);

	const outlineStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
				},
			],
		};
	});

	const fillStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: liked.value,
				},
			],
			opacity: liked.value,
		};
	});

	const _onPress = useCallback(() => {
		if (props.onPress) props.onPress();
		liked.value = withSpring(liked.value ? 0 : 1);
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
	}, [props.isFavorite, props.onPress]);

	const { theme } = useTheme();

	return (
		<Pressable hitSlop={15} onPress={_onPress}>
			<Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
				<MaterialCommunityIcons
					name={"heart-outline"}
					size={props.size ?? 20}
					color={theme.colors.onSurface}
				/>
			</Animated.View>
			<Animated.View style={fillStyle}>
				<MaterialCommunityIcons
					name={"heart"}
					size={props.size ?? 20}
					color={theme.colors.red}
				/>
			</Animated.View>
		</Pressable>
	);
};

export default FavoriteButton;
