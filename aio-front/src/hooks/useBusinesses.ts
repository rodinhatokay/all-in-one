import { useQuery } from 'react-query';
import api from '../services/api/api';
import { Business } from '../services/business/business.types';

const fetchBusinesses = async (query?: string): Promise<Business[]> => {
	const { data } = await api.get<Business[]>('/business', {
		params: {
			query,
		},
	});
	return data;
};

const useBusinesses = () => {
	return useQuery<Business[], Error>({
		queryKey: ['businesses'],
		queryFn: () => fetchBusinesses(),
		enabled: true,
		staleTime: 1000 * 60 * 5, // 5 minutes (time in milliseconds)
		cacheTime: 1000 * 60 * 60, // 1 hour (time in milliseconds)
	});
};

export default useBusinesses;
