import { FC } from "react";
import { StyleSheet } from "react-native";
import { Business } from "../../services/business/business.types";
import { Paragraph } from "react-native-paper";
import { useOpeningHours } from "../../hooks/useOpeningHours";

interface Props {
	openingHours: Business["openingHours"];
}

const OpeningHours: FC<Props> = (props) => {
	const { openingHours, statusTodayOpeningHours, todayOpeningHoursIndex } =
		useOpeningHours(props.openingHours);

	console.log(
		"todayOpeningHours",
		todayOpeningHoursIndex,
		statusTodayOpeningHours,
	);

	if (!openingHours.length) return null;

	return (
		<Paragraph style={styles.main}>{`${statusTodayOpeningHours}`}</Paragraph>
	);
};

const styles = StyleSheet.create({
	main: { marginVertical: 0, textDecorationLine: "underline" },
});

export default OpeningHours;
