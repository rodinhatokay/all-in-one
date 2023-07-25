import { useQuery } from 'react-query';
import api from '../services/api/api';

const fetchTermsAndConditions = async () => {
	const { data } = await api.get(
		`terms-of-use?language=ENGLISH&contentOnly=true`,
	);
	return data;
};

export const useTermsAndConditions = () => {
	return useQuery(
		'termsAndConditions',
		fetchTermsAndConditions,
		{ staleTime: 1000 * 60 * 60 }, // 1 hour
	);
};
