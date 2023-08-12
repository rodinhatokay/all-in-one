import { NavigatorScreenParams } from '@react-navigation/native';

export type GuestRoute = {
	// Intro: undefined;
	login: undefined;
	register: RegisterParams;
	homeStack: NavigatorScreenParams<HomeStack>;
	search: undefined;
};

export interface RegisterParams {
	phoneNumber?: string;
	access_token?: string;
}

export type Routes = {
	Temp: undefined;
};

export type HomeStack = {
	home: undefined;
	business: undefined;
	search: undefined;
};

export type AuthedRoutes = {
	homeStack: NavigatorScreenParams<HomeStack>;
	favoritesTab: undefined;
	profileTab?: {
		/**
		 * for future use: providing 'true' supposed to display delete user button
		 */
		displayDeleteUser?: string;
	};
};

export type RootNavigation = GuestRoute & Routes & AuthedRoutes;
