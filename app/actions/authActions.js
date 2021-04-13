import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	loadingUserInfo,
	setMessageSuccess,
	setMessageWarning,
} from "./uiActions";
import { clientAxios } from "../axios/clientAxios";
import { tokenAuth } from "../axios/tokenAuth";
import { types } from "../types/types";
import { setFoodRegisters } from "./nutritionSummaryActions";

export const getUser = (loading = true) => {
	return async (dispatch) => {
		const token = await AsyncStorage.getItem("token");

		if (token) {
			await tokenAuth(token);
		} else {
			dispatch(logoutUser());
		}

		try {
			loading && dispatch(loadingUserInfo(true));
			const { data } = await clientAxios.get("/user-profile");
			dispatch(setUserInformation(data));
			loading && dispatch(loadingUserInfo(false));
		} catch (e) {
			console.log(e.response);
			dispatch(loadingUserInfo(false));
			dispatch(logoutUser());
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
		try {
			const dataToSend = {
				user_email: email,
				user_pass: password,
			};
			const { data } = await clientAxios.post("/login", dataToSend);
			await AsyncStorage.setItem("token", data.access_token);
			dispatch(setMessageWarning(null));
			dispatch(getUser());
			dispatch(authenticateUserLogged());
		} catch (e) {
			dispatch(setMessageWarning(e.response.data.msg));
			console.log(e.response);
		}
	};
};

export const startUpdateProfileData = (
	profile_birthdate,
	profile_height,
	profile_genre,
	profile_actual_weight,
	profile_activity_level
) => {
	return async (dispatch) => {
		try {
			const dataToSend = {
				profile_genre,
				profile_height,
				profile_actual_weight,
				profile_birthdate,
				profile_activity_level,
			};

			const { data } = await clientAxios.put(
				"/update-profile",
				dataToSend
			);

			dispatch(getUser(false));
			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			dispatch(setMessageWarning(e.response.data.msg));
			setTimeout(() => {
				dispatch(setMessageWarning(null));
			}, 2000);
			console.log(e.response);
		}
	};
};

export const startChangeEmail = (email, newEmail, password) => {
	return async (dispatch) => {
		try {
			const dataToSend = {
				user_email: email,
				new_email: newEmail,
				user_pass: password,
			};
			const { data } = await clientAxios.put("/change-email", dataToSend);
			dispatch(logoutUser());
			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			dispatch(setMessageWarning(e.response.data.msg));
			setTimeout(() => {
				dispatch(setMessageWarning(null));
			}, 2000);
			console.log(e.response);
		}
	};
};

export const startUnsubscribeNutritionalPlan = (fn = null) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.put("/unsubscribe-caloric-plan");
			dispatch(getUser());
			dispatch(setMessageSuccess(data.msg));
			if (fn) fn();
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			dispatch(setMessageWarning(e.response.data.msg));
			setTimeout(() => {
				dispatch(setMessageWarning(null));
			}, 2000);
			console.log(e.response);
		}
	};
};

export const startChangePassword = (password, newPassword) => {
	return async (dispatch, getState) => {
		try {
			const { userInformation } = getState().auth;
			const dataToSend = {
				user_email: userInformation?.user.user_email,
				user_pass: password,
				new_password: newPassword,
			};
			const { data } = await clientAxios.put(
				"/change-password",
				dataToSend
			);
			dispatch(logoutUser());
			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 5000);
		} catch (e) {
			dispatch(setMessageWarning(e.response.data.msg));
			setTimeout(() => {
				dispatch(setMessageWarning(null));
			}, 2000);
			console.log(e.response);
		}
	};
};

export const logoutUser = () => {
	return async (dispatch) => {
		await AsyncStorage.removeItem("token");
		dispatch(setFoodRegisters([]));
		dispatch({
			type: types.logout,
		});
	};
};

export const userExists = (username, email, fn) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios(
				`/user-exists/${username}/${email}`
			);
			if (data.msg) {
				dispatch(setMessageWarning(data.msg));
			} else {
				dispatch(setMessageWarning(null));
				fn();
			}
		} catch (e) {
			console.log(e.response);
		}
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
