import {
	createNavigationContainerRef,
	StackActions,
} from "@react-navigation/native";

import { NavigatorScreenParams } from "@react-navigation/native";
import { RegisterParams, RootNavigation } from "./types";

export const navigationRef = createNavigationContainerRef<RootNavigation>();

/**
 * function no navigate anywhere
 * @example
 * navigate("register", { access_token, phoneNumber });
 * navigate("login");
 */
export const navigate = <RouteName extends keyof RootNavigation>(
	...args: undefined extends RootNavigation[RouteName]
		? [RouteName] | [RouteName, RootNavigation[RouteName]]
		: [RouteName, RootNavigation[RouteName]]
) => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(args[0] as any, args[1] as any);
	}
};

/**
 * func to go back on the navigation
 */
export const goBack = (): void => {
	if (navigationRef.isReady()) {
		navigationRef.goBack();
	}
};

/**
 * push new screen into the navigation stack
 */
export const push = (name: keyof RootNavigation) => {
	// navigationRef.push();
	if (navigationRef.isReady()) {
		navigationRef.dispatch(StackActions.push(name));
	}
};
