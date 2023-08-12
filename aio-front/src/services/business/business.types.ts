export type Business = {
	id: string;
	name: string;
	logoPath: string;
	description: string;
	address: string;
	hasWhatsapp: boolean;
	phoneNumber: string;
	location: {
		latitude: number;
		longitude: number;
	};
	owner: string;
	category: { name: string; id: string };
	openingHours: {
		id: number;
		day: DayOfWeek;
		hours: { start: string; end: string }[];
	}[];
};

export type DayOfWeek =
	| 'Sunday'
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday';
