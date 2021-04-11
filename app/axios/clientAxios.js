import axios from "axios";
import { Platform } from "react-native";

export const clientAxios = axios.create({
	baseURL:
		Platform.OS === "android"
			? "http://10.0.2.2:5000/api"
			: "http://localhost:5000/api",
	// baseURL:
	// 	Platform.OS === "android"
	// 		? "http://192.168.42.51:8080/api"
	// 		: "http://192.168.42.51:8080/api",
});
