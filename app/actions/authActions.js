import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	loadingUserInfo,
	setMessageSuccess,
	setMessageWarning,
	loadingLoginUser,
} from "./uiActions";
import { clientAxios } from "../axios/clientAxios";
import { tokenAuth } from "../axios/tokenAuth";
import { types } from "../types/types";
import { setFoodRegisters } from "./nutritionSummaryActions";
import { errorMessageLogoutAction, formatDate } from "../helpers/helpers";
import { cancelAllScheduledNotificationsAsync } from "expo-notifications";

export const logoutUser = () => {
	return async (dispatch) => {
		await AsyncStorage.removeItem("token");
		await cancelAllScheduledNotificationsAsync();
		dispatch(setFoodRegisters([]));
		dispatch({
			type: types.logout,
		});
	};
};

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
			dispatch(logoutUser());
			dispatch(loadingUserInfo(false));
		}
	};
};

export const startCreateUser = () => {
	return async (dispatch, getState) => {
		const { dataToRegist } = getState().createAccountProcess;

		const dataToSend = {
			user_name: dataToRegist.username,
			user_email: dataToRegist.email.trim(),
			user_pass: dataToRegist.password,
			profile_genre: dataToRegist.genre,
			profile_height: dataToRegist.height,
			profile_actual_weight: dataToRegist.actualWeigth,
			profile_birthdate: dataToRegist.birthdate,
			profile_activity_level: dataToRegist.activityLevel,
			created_at: formatDate(new Date()),
		};

		try {
			dispatch(loadingUserInfo(true));
			const { data } = await clientAxios.post("/regist-user", dataToSend);
			await AsyncStorage.setItem("token", data.access_token);
			dispatch(getUser());
			dispatch(loadingUserInfo(false));
		} catch (e) {
			console.log(e.response);
			dispatch(loadingUserInfo(false));
		}
	};
};

export const startLoginUser = (email, password) => {
	return async (dispatch) => {
		try {
			const dataToSend = {
				user_email: email.trim(),
				user_pass: password,
			};

			dispatch(loadingLoginUser(true));
			const { data } = await clientAxios.post("/login", dataToSend);
			await AsyncStorage.setItem("token", data.access_token);
			dispatch(setMessageWarning(null));
			dispatch(getUser());
			dispatch(loadingLoginUser(false));
		} catch (e) {
			console.log(e.response);
			dispatch(setMessageWarning(e.response.data.msg));
			dispatch(loadingLoginUser(false));
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
				profile_initial_date_caloric_plan: formatDate(new Date()),
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
			console.log(e.response);
			if (e.response.status === 401) {
				errorMessageLogoutAction(e.response, dispatch);
			} else {
				dispatch(setMessageWarning(e.response.data.msg));
				setTimeout(() => {
					dispatch(setMessageWarning(null));
				}, 2000);
			}
		}
	};
};

export const startChangeEmail = (email, newEmail, password) => {
	return async (dispatch) => {
		try {
			const dataToSend = {
				user_email: email.trim(),
				new_email: newEmail.trim(),
				user_pass: password,
			};
			const { data } = await clientAxios.put("/change-email", dataToSend);
			dispatch(logoutUser());
			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				errorMessageLogoutAction(e.response, dispatch);
			} else {
				dispatch(setMessageWarning(e.response.data.msg));
				setTimeout(() => {
					dispatch(setMessageWarning(null));
				}, 2000);
			}
		}
	};
};

export const startUnsubscribeNutritionalPlan = (fn = null) => {
	return async (dispatch) => {
		const dataToSend = {
			profile_cancel_date_caloric_plan: formatDate(new Date()),
		};
		try {
			const { data } = await clientAxios.put(
				"/unsubscribe-caloric-plan",
				dataToSend
			);
			dispatch(getUser());
			dispatch(setMessageSuccess(data.msg));
			if (fn) fn();
			setTimeout(() => {
				dispatch(setMessageWarning(null));
			}, 2000);
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				errorMessageLogoutAction(e.response, dispatch);
			} else {
				dispatch(setMessageWarning(e.response.data.msg));
				setTimeout(() => {
					dispatch(setMessageWarning(null));
				}, 2000);
			}
		}
	};
};

export const startChangePassword = (password, newPassword) => {
	return async (dispatch, getState) => {
		try {
			const { userInformation } = getState().auth;
			const dataToSend = {
				user_email: userInformation?.user.user_email.trim(),
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
			console.log(e.response.status);
			if (e.response.status === 401) {
				errorMessageLogoutAction(e.response, dispatch);
			} else {
				dispatch(setMessageWarning(e.response.data.msg));
				setTimeout(() => {
					dispatch(setMessageWarning(null));
				}, 2000);
			}
		}
	};
};

export const userExists = (username, email, fn) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios(
				`/user-exists/${username}/${email.trim()}`
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

export const authenticateUser = () => ({
	type: types.createAccount,
});

export const setUserInformation = (information) => ({
	type: types.setUserInformation,
	payload: information,
});
