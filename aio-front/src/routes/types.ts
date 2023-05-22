export type NoAuthStack = {
	// Intro: undefined;
	Login: undefined;
	Register: undefined;
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
