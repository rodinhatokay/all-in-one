import { FC, memo, useCallback, useMemo, useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, View } from 'react-native';
import { Business } from '../../../services/business/business.types';
import { Text } from '../../partials/Text';
import { useOpeningHours } from '../../../hooks/useOpeningHours';
import DropDownIcon from '../../DropDownIcon/DropDownIcon';
import { useTheme } from '../../../contexts/ThemeContext';
import { useLocalization } from '../../../contexts/LocalizationContext';
import * as Haptics from 'expo-haptics';

interface Props {
	openingHours: Business['openingHours'];
}

const OpeningHours: FC<Props> = (props) => {
	const [expandList, setExpanedList] = useState<boolean>(false);
	const { openingHours, statusTodayOpeningHours, todayOpeningHoursIndex } =
		useOpeningHours(props.openingHours);

	const toggleSetExpandList = useCallback(() => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		LayoutAnimation.configureNext(
			LayoutAnimation.create(
				250,
				LayoutAnimation.Types.linear,
				LayoutAnimation.Properties.scaleY,
			),
		); // create spring animation for next layout
		setExpanedList((val) => !val);
	}, [setExpanedList]);

	const { theme } = useTheme();
	const { t } = useLocalization();

	const colorTodayText = useMemo(
		() =>
			statusTodayOpeningHours === 'open'
				? theme.colors.green
				: theme.colors.red,
		[statusTodayOpeningHours],
	);

	if (!openingHours.length) return null;

	return (
		<Pressable hitSlop={10} onPress={toggleSetExpandList} style={styles.main}>
			<View style={styles.contentContainer}>
				{expandList ? (
					openingHours.map((openingHour, idx) => {
						return (
							<View key={idx} style={styles.expandedListView}>
								<Text variant="bodySmall" style={styles.dayText}>
									{t(openingHour.day)}:{' '}
								</Text>
								<Text variant="bodySmall" key={openingHour.day}>
									{openingHour.hoursAsText
										? openingHour.hoursAsText
										: t('closed')}
								</Text>
							</View>
						);
					})
				) : (
					<Text variant="bodySmall" style={{ color: colorTodayText }}>
						<Text
							variant="bodySmall"
							style={[{ color: colorTodayText }, styles.dayText]}
						>
							{t('today')}:
						</Text>{' '}
						{`${
							openingHours[todayOpeningHoursIndex].hoursAsText
								? openingHours[todayOpeningHoursIndex].hoursAsText
								: t('closed')
						}`}
					</Text>
				)}
			</View>
			<DropDownIcon
				onClick={toggleSetExpandList}
				status={expandList ? 'down' : 'up'}
			/>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	main: { flexDirection: 'row' },
	contentContainer: { flex: 1, flexDirection: 'column' },
	expandedListView: { flexDirection: 'row', paddingVertical: 1 },
	dayText: { fontWeight: '700', fontFamily: 'Rubik-Medium' },
});

export default memo(OpeningHours);
