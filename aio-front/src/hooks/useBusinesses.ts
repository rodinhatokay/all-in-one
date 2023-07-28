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

interface Options {
	query?: string;
	disabledWhenQueryEmpty?: boolean;
}

const useBusinesses = (options?: Options) => {
	const disableFetch = options?.disabledWhenQueryEmpty && !options.query;
	return useQuery<Business[], Error>({
		queryKey: ['businesses', options?.query],
		queryFn: () => fetchBusinesses(options?.query),
		enabled: !disableFetch,
		staleTime: 1000 * 60 * 5, // 5 minutes (time in milliseconds)
		cacheTime: 1000 * 60 * 60, // 1 hour (time in milliseconds)
	});
};

export default useBusinesses;
