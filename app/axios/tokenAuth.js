import { clientAxios } from "./clientAxios";

export const tokenAuth = () => {
	const token = localStorage.getItem("token");
	if (token) {
		clientAxios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${token}`;
	} else {
		delete clientAxios.defaults.headers.common["Authorization"];
	}
};
