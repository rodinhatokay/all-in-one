import { DayOfWeek } from "./days-of-week.dto";

export class OpeningHours {
	day: DayOfWeek;
	hours: { start: string; end: string }[];
}