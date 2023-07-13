export type Business = {
	id: string;
	name: string;
	logoPath: string;
	description: string;

	hasWhatsapp: boolean;
	location: {
		latitude: number;
		longitude: number;
	};
	owner: string;
	openingHours: {
		id: number;
		day: DayOfWeek;
		hours: { start: string; end: string }[];
	}[];
};

export type DayOfWeek =
	| "Sunday"
	| "Monday"
	| "Tuesday"
	| "Wednesday"
	| "Thursday"
	| "Friday"
	| "Saturday";
