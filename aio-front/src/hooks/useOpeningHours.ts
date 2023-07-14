import { useMemo } from "react";
import {
	format,
	isWithinInterval,
	getDay,
	set,
	parse,
	compareAsc,
} from "date-fns";
import { Business, DayOfWeek } from "../services/business/business.types";

type OpeningHours = {
	id: number;
	day: DayOfWeek;
	hours: { start: string; end: string }[];
}[];

const daysOfWeek: DayOfWeek[] = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export const useOpeningHours = (rawOpeningHours: Business["openingHours"]) => {
	return useMemo(() => {
		// Get the current day and time
		const now = new Date();
		const currentDayIndex = getDay(now);
		// Sort the opening hours array by day of week, Sunday to Saturday
		const sortedOpeningHours = [...rawOpeningHours].sort((a, b) => {
			return daysOfWeek.indexOf(a.day) - daysOfWeek.indexOf(b.day);
		});

		let statusTodayOpeningHours: "open" | "closed" = "closed";
		const todayOpeningHoursIndex = sortedOpeningHours.findIndex(
			(val) => val.day === daysOfWeek[currentDayIndex],
		);

		if (todayOpeningHoursIndex > -1) {
			// there is opening hours today
			// decide if its open or closed and set opening hours
			const isOpen = sortedOpeningHours[todayOpeningHoursIndex].hours.some(
				(hour) => {
					const start = parse(hour.start, "HH:mm", new Date());
					const end = parse(hour.end, "HH:mm", new Date());
					return isWithinInterval(now, {
						start: set(now, {
							hours: start.getHours(),
							minutes: start.getMinutes(),
						}),
						end: set(now, { hours: end.getHours(), minutes: end.getMinutes() }),
					});
				},
			);
			statusTodayOpeningHours = isOpen ? "open" : "closed";
		}

		return {
			todayOpeningHoursIndex,
			statusTodayOpeningHours,
			openingHours: sortedOpeningHours,
		};
	}, [rawOpeningHours]);
};
