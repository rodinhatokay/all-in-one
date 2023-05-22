export type NoAuthStack = {
	// Intro: undefined;
	Login: undefined;
	register: undefined;
};

export type Routes = {
	Temp: undefined;
};

export type HomeStack = {
	home: undefined;
	business: undefined;
	search: undefined;
};

export type RootNavigation = NoAuthStack & Routes & HomeStack;
