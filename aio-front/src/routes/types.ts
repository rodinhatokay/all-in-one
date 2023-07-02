export type NoAuthStack = {
	// Intro: undefined;
	login: undefined;
	register: RegisterParams;
};

export interface RegisterParams {
	phoneNumber: string;
	access_token: string;
}

export type Routes = {
	Temp: undefined;
};

export type HomeStack = {
	home: undefined;
	business: undefined;
	search: undefined;
};

export type RootNavigation = NoAuthStack & Routes & HomeStack;
