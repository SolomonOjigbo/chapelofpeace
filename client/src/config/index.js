import axios from "axios";
import { checkAuthUser } from "../lib/auth";

export const isLocalHost = Boolean(
	window.location.hostname === "localhost" ||
		window.location.hostname === "[::1]" ||
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
		)
);
export const SERVER_URL = isLocalHost
	? "http://localhost:5000"
	: "https://api.chapelofpeacefuw.org";

export const APP_URL = isLocalHost
	? "http://localhost:3000"
	: "https://chapelofpeacefuw.org";

const token = localStorage.getItem("token");

const Axios = axios.create({
	baseURL: `${SERVER_URL}/api`,
});

export default Axios;

const authAxios = axios.create({
	withCredentials: true,
	baseURL: `${SERVER_URL}/api`,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

authAxios.interceptors.request.use(
	async (config) => {
		if (!config.headers["Authorization"]) {
			const value = checkAuthUser();
			if (!value) return Promise.reject(new Error("No authorization"));
			//parse the data
			config.headers.Authorization = `Bearer ${config.headers["Authorization"]}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { authAxios };
