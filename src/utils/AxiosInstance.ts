import axios from 'axios';

const BaseURL = process.env.APIURL;

export const generateAxiosInstance = () => {
    const axiosInstance = axios.create({
        baseURL: BaseURL,
        headers: {
            "apiKey": `${process.env.APIKEY}`,
        }
    });
    return axiosInstance;
}