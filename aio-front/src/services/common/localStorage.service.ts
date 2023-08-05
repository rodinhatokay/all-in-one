import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type StorageOption = {
	secured?: boolean;
};

/**
 * ! NOTE: using same keys one secured and not secured will store on different places
 */
const LocalStorage = {
	setItem: async (key: string, value: string, options?: StorageOption) => {
		if (Platform.OS === 'web' || !options?.secured) {
			return await AsyncStorage.setItem(key, value);
		} else {
			return await SecureStore.setItemAsync(key, value);
		}
	},

	getItem: async (key: string, options?: StorageOption) => {
		if (Platform.OS === 'web' || !options?.secured) {
			return await AsyncStorage.getItem(key);
		} else {
			return await SecureStore.getItemAsync(key);
		}
	},

	removeItem: async (key: string, options?: StorageOption) => {
		if (Platform.OS === 'web' || !options?.secured) {
			return await AsyncStorage.removeItem(key);
		} else {
			return await SecureStore.deleteItemAsync(key);
		}
	},
};

export default LocalStorage;
