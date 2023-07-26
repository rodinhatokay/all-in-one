import { useMemo } from 'react';
import { isWithinInterval, getDay, set, parse, parseISO } from 'date-fns';
import { Business, DayOfWeek } from '../services/business/business.types';

const daysOfWeek: DayOfWeek[] = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
];

export const useOpeningHours = (rawOpeningHours: Business['openingHours']) => {
	return useMemo(() => {
		try {
			// Get the current day and time
			const now = new Date();
			const currentDayIndex = getDay(now);
			//  create hoursAsText for display and sort the opening hours array by day of week, Sunday to Saturday

			const modifiedOpeningHours = rawOpeningHours
				.map((openingHour) => {
					// Sort the hours array
					const sortedHours = [...openingHour.hours].sort((a, b) => {
						const aStart = parseISO(`1970-01-01T${a.start}:00Z`);
						const bStart = parseISO(`1970-01-01T${b.start}:00Z`);
						return aStart.getTime() - bStart.getTime();
					});
					const hoursAsText = sortedHours
						.map((hour) => `${hour.start} - ${hour.end}`)
						.join('\n');
					return { ...openingHour, hours: sortedHours, hoursAsText };
				})
				.sort((a, b) => {
					// Then sort the opening hours by day of week
					return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
				});

			let statusTodayOpeningHours: 'open' | 'closed' = 'closed';
			const todayOpeningHoursIndex = modifiedOpeningHours.findIndex(
				(val) => val.day === daysOfWeek[currentDayIndex],
			);

			if (todayOpeningHoursIndex > -1) {
				// there is opening hours today
				// decide if its open or closed and set opening hours
				const isOpen = modifiedOpeningHours[todayOpeningHoursIndex].hours.some(
					(hour) => {
						const start = parse(hour.start, 'HH:mm', new Date());
						const end = parse(hour.end, 'HH:mm', new Date());
						return isWithinInterval(now, {
							start: set(now, {
								hours: start.getHours(),
								minutes: start.getMinutes(),
							}),
							end: set(now, {
								hours: end.getHours(),
								minutes: end.getMinutes(),
							}),
						});
					},
				);
				statusTodayOpeningHours = isOpen ? 'open' : 'closed';
			}

			return {
				todayOpeningHoursIndex,
				statusTodayOpeningHours,
				openingHours: modifiedOpeningHours,
			};
		} catch (error) {
			console.log('error calculating opening hours', error);
			return {
				todayOpeningHoursIndex: -1,
				statusTodayOpeningHours: 'closed',
				openingHours: [],
			};
		}
	}, [rawOpeningHours]);
};
