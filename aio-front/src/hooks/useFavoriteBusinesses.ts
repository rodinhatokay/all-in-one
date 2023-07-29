import { useCallback, useMemo, useState } from 'react';
import { logError } from '../services/logger/loggerService';
import { useAuth } from '../contexts/AuthContext';
import { generateFavoriteBusinessesApi } from '../services/favorite-businesses/favoriteBusinessesApi';

export const useFavoriteBusinesses = () => {
	const { user } = useAuth();
	const [loading, setLoading] = useState(false);

	const getFavorites = useCallback(async () => {
		try {
			setLoading(true);
			if (!user) {
				return [];
			}

			const favorites = await generateFavoriteBusinessesApi(user.id);
			setLoading(true);
			return favorites;
		} catch (err) {
			logError('error onPressGetFavorites', err);
			throw err;
		} finally {
			setLoading(false);
		}
	}, [setLoading, loading]);

	return useMemo(() => {
		return {
			getFavorites,
		};
	}, [getFavorites]);
};

export default useFavoriteBusinesses;
