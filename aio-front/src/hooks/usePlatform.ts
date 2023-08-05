import { Platform } from 'react-native';

export const useIsWeb = (): boolean => {
	return Platform.OS === 'web';
};

export const useIsMobile = (): boolean => {
	return Platform.OS === 'android' || Platform.OS === 'ios';
};
