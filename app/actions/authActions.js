import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadingUserInfo } from "./uiActions";
import { clientAxios } from "../axios/clientAxios";
import { tokenAuth } from "../axios/tokenAuth";
import { types } from "../types/types";

export const getUser = () => {
	return async (dispatch) => {
		const token = await AsyncStorage.getItem("token");
		if (token) {
			await tokenAuth(token);
		}

		try {
			dispatch(loadingUserInfo(true));
			const { data } = await clientAxios.get("/user-profile");
			dispatch(setUserInformation(data));
			dispatch(loadingUserInfo(false));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startCreateUser = () => {
	return async (dispatch, getState) => {
		const { dataToRegist } = getState().createAccountProcess;

		const dataToSend = {
			user_name: dataToRegist.username,
			user_email: dataToRegist.email,
			user_pass: dataToRegist.password,
			profile_genre: dataToRegist.genre,
			profile_height: dataToRegist.height,
			profile_actual_weight: dataToRegist.actualWeigth,
			profile_birthdate: dataToRegist.birthdate,
			profile_activity_level: dataToRegist.activityLevel,
		};

		try {
			const { data } = await clientAxios.post("/regist-user", dataToSend);
			await AsyncStorage.setItem("token", data.access_token);
			dispatch(getUser());
			dispatch(authenticateUserCreated());
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startLoginUser = (email, password) => {
	return async (dispatch) => {
		const dataToSend = {
			user_email: email,
			user_pass: password,
		};

		try {
			const { data } = await clientAxios.post("/login", dataToSend);
			await AsyncStorage.setItem("token", data.access_token);
			dispatch(getUser());
			dispatch(authenticateUserLogged());
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const logoutUser = () => {
	return async (dispatch) => {
		await AsyncStorage.removeItem("token");

		dispatch({
			type: types.logout,
		});
	};
};

export const authenticateUserCreated = () => ({
	type: types.createAccount,
});

export const authenticateUserLogged = () => ({
	type: types.login,
});
export const setUserInformation = (information) => ({
	type: types.setUserInformation,
	payload: information,
});
