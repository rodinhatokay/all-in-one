import {
	createNavigationContainerRef,
	StackActions,
} from "@react-navigation/native";

// import {NavigatorScreenParams} from '@react-navigation/native';
import { RootNavigation } from "./types";

export const navigationRef = createNavigationContainerRef<RootNavigation>();

/**
 * function no navigate anywhere
 */
export const navigate = (
	name: keyof RootNavigation,
	// params?: NavigatorScreenParams<never>,
): void => {
	// params.screen ==  '';
	if (navigationRef.isReady()) {
		// navigationRef.navigate(name, params);
		navigationRef.navigate(name);
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
