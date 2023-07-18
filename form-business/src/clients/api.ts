import _axios from "axios";
import config from "../config";

const axiosApp = _axios.create({
	baseURL: config.baseUrl,
	timeout: 30000, // 30 seconds
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${config.authToken}`,
	},
});

export default axiosApp;
