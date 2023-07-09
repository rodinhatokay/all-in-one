import Axios from "axios";
import * as SecureStore from "expo-secure-store";
const KEY_STORE_TOKEN = "StoreTokenAPI";

const baseUrlApi = "http://192.168.1.107:3001/api"; // temporary local ip will fix later

const api = Axios.create({
	baseURL: baseUrlApi,
	timeout: 30000, // 30 seconds
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

if (__DEV__) {
	api.interceptors.request.use(
		function (config) {
			console.log(`API URL(${config.method}):`, config.url);

			console.log("API DATA:", config.data);
			return config;
		},
		function (error) {
			console.log("API ERROR:", error);

			return Promise.reject(error);
		},
	);
}

/**
 * store token locally to end user
 */
export const storeApiToken = async (token: string) => {
	await SecureStore.setItemAsync(KEY_STORE_TOKEN, token);
};

/**
 * get token stored locally to end user
 */
export const getStoredApiToken = async () => {
	return await SecureStore.getItemAsync(KEY_STORE_TOKEN);
};

/**
 * removes token stored locally to end user
 */
export const removeStoredApiToken = async () => {
	return await SecureStore.deleteItemAsync(KEY_STORE_TOKEN);
};

export default api;
