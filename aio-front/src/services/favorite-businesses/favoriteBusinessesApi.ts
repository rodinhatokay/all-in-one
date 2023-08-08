import api from '../api/api';
import { Business } from '../business/business.types';

/**
 * sends request to get favorite businesses to server
 * @param userId
 * @returns Business[]
 */
export const getFavoriteBusinessesApi = async (
	userId: string,
): Promise<Business[]> => {
	console.log(`favorite-businesses/${userId}`);
	const { data } = await api.get(`favorite-businesses/${userId}`);
	return data;
};