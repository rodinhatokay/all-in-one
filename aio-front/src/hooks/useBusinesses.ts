import { useQuery } from "react-query";
import api from "../services/api/api";
import { Business } from "../services/business/business.types";

const fetchBusinesses = async (): Promise<Business[]> => {
	const { data } = await api.get<Business[]>("/business");
	return data;
};

const useBusinesses = () => {
	const { data, error, isLoading, isError } = useQuery<Business[], Error>(
		"businesses",
		fetchBusinesses,
	);

	return { data, error, isLoading, isError };
};

export default useBusinesses;
