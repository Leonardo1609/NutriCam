import { clientAxios } from "../axios/clientAxios";
import { errorMessageLogoutAction } from "../helpers/helpers";
import { types } from "../types/types";

export const startGetUserRegistersPerDay = (userId) => {
	return async (dispatch, getState) => {
		try {
			const { dateOfUserRegister } = getState().administratorSpecificUser;
			const { data } = await clientAxios.get(
				`/user-registers-per-day/${userId}/${dateOfUserRegister}`
			);

			dispatch(setFoodUserRegisters(data.food_registers));
		} catch (e) {
			console.log(e.response);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const startGetUserSummaryPerDay = (userId) => {
	return async (dispatch, getState) => {
		try {
			const { dateOfUserSummary } = getState().administratorSpecificUser;
			const { data } = await clientAxios.get(
				`/user-nutrition-summary/${userId}/${dateOfUserSummary}`
			);
			dispatch(setNutritionUserSummary(data.summary));
		} catch (e) {
			console.log(e);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const setDateOfUserRegister = (date) => ({
	type: types.setDateOfUserRegister,
	payload: date,
});

export const setDateOfUserSummary = (date) => ({
	type: types.setDateOfUserSummary,
	payload: date,
});

export const setNutritionUserSummary = (nutritionUserSummary) => ({
	type: types.setNutritionUserSummary,
	payload: nutritionUserSummary,
});

export const setFoodUserRegisters = (foodUserRegisters) => ({
	type: types.setFoodUserRegisters,
	payload: foodUserRegisters,
});
