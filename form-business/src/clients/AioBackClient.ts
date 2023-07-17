import axios, { AxiosRequestConfig } from "axios";
import { convertDataToOpeningHours } from "../utils";

export class AioBackClient {
  private readonly baseUrl: string;
  private readonly authToken: string;

  constructor(baseUrl: string, authToken: string) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  public async uploadFile(file: any): Promise<any> {
    const formData = new FormData();
    formData.append("file", file);

    // Prepare the request headers
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${this.authToken}`,
    };

    // Create the Axios request configuration
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${this.baseUrl}/space/spaces`, // Adjust the URL endpoint according to your backend API
      headers: headers,
      data: formData,
    };

    // Send the POST request to the backend using Axios
    const response = await axios(config);

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
      };

      // Prepare the request headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      };

      // Prepare the request body
      const requestBody = JSON.stringify(createBusiness);

      // Create the Axios request configuration
      const config: AxiosRequestConfig = {
        method: "post",
        url: `${this.baseUrl}/business`, // Adjust the URL endpoint according to your backend API
        headers: headers,
        data: requestBody,
      };

      // Send the POST request to the backend using Axios
      const response = await axios(config);

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
      // Prepare the request headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authToken}`,
      };

      // Create the Axios request configuration
      const config: AxiosRequestConfig = {
        method: "get",
        url: `${this.baseUrl}/category`, // Adjust the URL endpoint according to your backend API
        headers: headers,
      };

      // Send the POST request to the backend using Axios
      const response = await axios(config);

      // Return the response from the backend
      return response.data;
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
      throw new Error("Failed to get categories");
    }
  }
}
