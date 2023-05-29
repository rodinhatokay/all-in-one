import axios from "axios";

/**
 * checks if error is type of network error
 */
export const isNetworkError = (error: Error): boolean => {
	if (axios.isAxiosError(error)) {
		if (!error.response) return true;
	}
	return error.message === "Network Error";
};
