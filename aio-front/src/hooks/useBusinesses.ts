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
	const { data, error, isLoading, isError } = useQuery<Business[], Error>(
		['businesses', options?.query],
		() => fetchBusinesses(options?.query),
		{
			enabled: !disableFetch,
		},
	);

	return { data, error, isLoading, isError };
};

export default useBusinesses;
