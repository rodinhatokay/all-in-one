export type NoAuthStack = {
	// Intro: undefined;
	Login: undefined;
	register: undefined;
};

export type Routes = {
	Temp: undefined;
};

export type HomeStack = {
	Home: undefined;
	Business: undefined;
};

export type RootNavigation = NoAuthStack & Routes & HomeStack;
