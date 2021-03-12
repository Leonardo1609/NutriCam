import AsyncStorage from "@react-native-async-storage/async-storage";
import { clientAxios } from "./clientAxios";

export const tokenAuth = async () => {
	const token = await AsyncStorage.getItem("token");

	if (token) {
		clientAxios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
	} else {
		delete clientAxios.defaults.headers.common["Authorization"];
	}
};
