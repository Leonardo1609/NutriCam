import axios from "axios";
import { Platform } from "react-native";

export const clientAxios = axios.create({
	baseURL:
		Platform.OS === "android"
			? "http://10.0.2.2:5000/api"
			: "http://localhost:5000/api",
});
