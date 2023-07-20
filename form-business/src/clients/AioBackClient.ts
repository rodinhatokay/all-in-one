import { AxiosInstance, AxiosRequestConfig } from "axios";
import { convertDataToOpeningHours } from "../utils";

export class AioBackClient {
	constructor(private readonly axios: AxiosInstance) {}

	public async uploadFile(file: any): Promise<any> {
		const formData = new FormData();
		formData.append("file", file);
		// Prepare the request headers
		const headers = {
			"Content-Type": "multipart/form-data",
		};

		// Send the POST request to the backend using Axios
		const response = await this.axios.post("/space/spaces", formData, {
			headers,
		});

		// Return the response from the backend
		return response.data;
	}

	public async createBusiness(form: any): Promise<any> {
		try {
			// Create an instance of Location
			const location = {
				latitude: parseFloat(form["location.lat"]),
				longitude: parseFloat(form["location.lon"]),
			};

			// Create an array of OpeningHours
			// const openingHours = form.openingHours.map((item: any) => {
			//   return {
			//     day: item.day,
			//     hours: [{ start: item.start, end: item.end }],
			//   };
			// });

			// Create an instance of CreateBusiness
			const createBusiness = {
				name: form.name,
				phoneNumber: form.phoneNumber,
				logoPath: form.filePath,
				hasWhatsapp: form.hasWhatsapp,
				description: form.description,
				location: location,
				openingHours: convertDataToOpeningHours(form.openingHours),
				address: form.address,
        category: form.category,
			};

			// Send the POST request to the backend using Axios
			// const response = await axios(config);
			const response = await this.axios.post("/business", createBusiness);

			// Return the response from the backend
			return response.data;
		} catch (error) {
			// Handle any errors that occurred during the request
			console.error(error);
			throw new Error("Failed to create business");
		}
	}

	public async getCategories(): Promise<any> {
		try {
			// Send the POST request to the backend using Axios
			const response = await this.axios.get("/category");

			// Return the response from the backend
			return response.data;
		} catch (error) {
			// Handle any errors that occurred during the request
			console.error(error);
			throw new Error("Failed to get categories");
		}
	}
}
