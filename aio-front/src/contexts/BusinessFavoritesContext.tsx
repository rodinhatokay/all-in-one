import {
	createContext,
	useContext,
	ReactNode,
	useState,
	useRef,
	useMemo,
	useCallback,
} from 'react';
import {
	useQuery,
	useMutation,
	UseQueryResult,
	// UseMutationResult,
	useQueryClient,
} from 'react-query';
import api from '../services/api/api';
import { useAuth } from './AuthContext';
import { Business } from '../services/business/business.types';

type BusinessFavoritesContextType = {
	favoritesQuery: UseQueryResult<Business[], unknown>;
	toggleFavoriteBusiness: (business: Business) => void;
	businessFavoriteIds: Set<string>;
};

const BusinessFavoritesContext = createContext<
	BusinessFavoritesContextType | undefined
>(undefined);

type Props = {
	children: ReactNode;
};

export const BusinessFavoritesProvider: React.FC<Props> = ({ children }) => {
	const { isAuthenticated, user } = useAuth();
	const queryClient = useQueryClient();

	// Local state to store favorite business IDs as a set
	const [businessFavoriteIds, setFavoriteIds] = useState<Set<string>>(
		new Set(),
	);

	const abortControllersRef = useRef<Map<string, AbortController>>(new Map());

	const favoritesQuery = useQuery<Business[]>(
		['favorite-businesses'],
		async () => {
			if (!isAuthenticated) return [];
			const response = await api.get<Business[]>('favorite-businesses');
			return response.data;
		},
		{
			enabled: isAuthenticated, // Only fetch when authenticated
			onSuccess: (data) => {
				// Update the set of favorite business IDs
				setFavoriteIds(new Set(data.map((business) => business.id)));
			},
		},
	);

	const addFavorite = useMutation<
		Business,
		unknown,
		{ userId: string; business: Business }
	>(
		async (data) => {
			// Abort any previous request
			const currentBusinessId = data.business.id;

			// Abort any previous request for the same business ID
			const existingController =
				abortControllersRef.current.get(currentBusinessId);
			if (existingController) {
				existingController.abort();
			}

			// Create a new AbortController instance and associate it with the business ID
			const newController = new AbortController();
			abortControllersRef.current.set(currentBusinessId, newController);

			const response = await api.post<Business>(
				'favorite-businesses',
				{ userId: data.userId, businessId: data.business.id },
				{
					signal: newController.signal,
				},
			);
			return response.data;
		},
		{
			onMutate: ({ business }) => {
				// Optimistic update for the Set
				setFavoriteIds((prevIds) => new Set([...prevIds, business.id]));

				// Optimistic update for the query data
				queryClient.setQueryData<Business[]>(
					'favorite-businesses',
					(oldData) => {
						if (!oldData) return [];
						return [...oldData, business];
					},
				);
			},
			onError: (error, { business }) => {
				// Revert optimistic update for the Set
				setFavoriteIds((prevIds) => {
					prevIds.delete(business.id);
					return new Set(prevIds);
				});

				// Revert optimistic update for the query data
				queryClient.setQueryData<Business[]>(
					'favorite-businesses',
					(oldData) => {
						if (!oldData) return [];
						return oldData.filter((b) => b.id !== business.id);
					},
				);
			},
			onSuccess: (data, variables) => {
				// Remove the AbortController for this business ID
				abortControllersRef.current.delete(variables.business.id);
			},
		},
	);

	const removeFavorite = useMutation<
		void,
		unknown,
		{ userId: string; business: Business }
	>(
		async (data) => {
			// Abort any previous request
			const currentBusinessId = data.business.id;
			// Abort any previous request for the same business ID
			const existingController =
				abortControllersRef.current.get(currentBusinessId);
			if (existingController) {
				existingController.abort();
			}
			// Create a new AbortController instance and associate it with the business ID
			const newController = new AbortController();
			abortControllersRef.current.set(currentBusinessId, newController);

			const resp = await api.delete('favorite-businesses', {
				signal: newController.signal,
				params: {
					businessId: currentBusinessId,
				},
			});
			return resp.data;
		},
		{
			onMutate: (data) => {
				// Optimistic update for the Set
				setFavoriteIds((prevIds) => {
					prevIds.delete(data.business.id);
					return new Set(prevIds);
				});

				// Optimistic update for the query data
				queryClient.setQueryData<Business[]>(
					'favorite-businesses',
					(oldData) => {
						if (!oldData) return [];
						return oldData.filter((b) => b.id !== data.business.id);
					},
				);
			},
			onError: (error, data) => {
				// Revert optimistic update for the Set
				setFavoriteIds((prevIds) => new Set([...prevIds, data.business.id]));

				// Revert optimistic update for the query data
				queryClient.setQueryData<Business[]>(
					'favorite-businesses',
					(oldData) => {
						if (!oldData) return [];
						return [...oldData, data.business];
					},
				);
			},
			onSuccess: (data, variables) => {
				// Remove the AbortController for this business ID
				abortControllersRef.current.delete(variables.business.id);
			},
		},
	);

	const toggleFavoriteBusiness = useCallback(
		(business: Business) => {
			if (!user) return;
			if (businessFavoriteIds.has(business.id)) {
				removeFavorite.mutate({ business, userId: user.id });
			} else {
				addFavorite.mutate({ business, userId: user.id });
			}
		},
		[user, businessFavoriteIds, removeFavorite, addFavorite],
	);

	const value = useMemo((): BusinessFavoritesContextType => {
		return {
			favoritesQuery,
			toggleFavoriteBusiness,
			businessFavoriteIds,
		};
	}, [favoritesQuery, toggleFavoriteBusiness, businessFavoriteIds]);

	return (
		<BusinessFavoritesContext.Provider value={value}>
			{children}
		</BusinessFavoritesContext.Provider>
	);
};

export const useBusinessFavorites = (): BusinessFavoritesContextType => {
	const context = useContext(BusinessFavoritesContext);
	if (!context) {
		throw new Error(
			'useBusinessFavorites must be used within a BusinessFavoritesProvider',
		);
	}
	return context;
};
