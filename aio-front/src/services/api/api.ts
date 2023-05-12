import Axios from "axios";
import * as SecureStore from "expo-secure-store";
const KEY_STORE_TOKEN = "StoreTokenAPI";

const baseUrlApi = "http://localhost:3010/api";

const api = Axios.create({
	baseURL: baseUrlApi,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

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
