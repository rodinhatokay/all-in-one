import Axios from 'axios';
import LocalStorage from '../common/localStorage.service';
const KEY_STORE_TOKEN = 'StoreTokenAPI';

export const baseUrlApi = !__DEV__
	? 'http://www.allinoneocean.com/api'
	: 'http://192.168.1.107:3001/api'; // temporary local ip will fix later

const api = Axios.create({
	baseURL: baseUrlApi,
	timeout: 30000, // 30 seconds
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

if (__DEV__) {
	api.interceptors.request.use(
		function (config) {
			console.log(`API URL(${config.method}):`, config.url);

			console.log('API requesting data:', config.data);
			return config;
		},
		function (error) {
			console.log('API ERROR:', error);

			return Promise.reject(error);
		},
	);
}

/**
 * store token locally to end user
 */
export const storeApiToken = async (token: string) => {
	await LocalStorage.setItem(KEY_STORE_TOKEN, token, { secured: true });
};

/**
 * get token stored locally to end user
 */
export const getStoredApiToken = async () => {
	return await LocalStorage.getItem(KEY_STORE_TOKEN, { secured: true });
};

/**
 * removes token stored locally to end user
 */
export const removeStoredApiToken = async () => {
	return await LocalStorage.removeItem(KEY_STORE_TOKEN, { secured: true });
};

export default api;
