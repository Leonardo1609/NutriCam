import { types } from "../types/types";
import { clientAxios } from "../axios/clientAxios";
import { setActiveFoodToRegist } from "./foodActions";

export const startGetFoodRegisters = () => {
	return async (dispatch, getState) => {
		const { dateOfRegister } = getState().nutritionSummary;
		try {
			const { data } = await clientAxios.get(
				`/registers-per-day/${dateOfRegister}`
			);
			dispatch(setFoodRegisters(data.food_registers));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startRegistFood = (
	day_food_id,
	food_measure_unit_id,
	food_id,
	food_name,
	quantity,
	calories,
	fn = null
) => {
	return async (dispatch) => {
		const dataToSend = {
			day_food_id: Number(day_food_id),
			food_measure_unit_id,
			food_id,
			quantity: Number(quantity),
		};

		try {
			const { data } = await clientAxios.post("/regist-food", dataToSend);
			const foodObject = {
				food_register_id: data.food_register_id,
				day_food_id,
				food_name,
				calories,
			};

			dispatch(newFoodRegister(foodObject));
			dispatch(setActiveFoodToRegist(null));

			if (fn) fn();
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startDeleteFoodRegister = (foodRegisterId) => {
	return async (dispatch) => {
		try {
			await clientAxios.delete(`/delete-regist/${foodRegisterId}`);

			dispatch(deleteFoodRegister(foodRegisterId));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startGetWeeklyCalories = (date) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get(`/weekly-summary/${date}`);
			dispatch(setWeeklyCalories(data.weekly_calories));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startGetNutritionSummary = () => {
	return async (dispatch, getState) => {
		const { dateOfSummary } = getState().nutritionSummary;
		try {
			const { data } = await clientAxios.get(
				`/nutrition-summary/${dateOfSummary}`
			);
			dispatch(setNutritionSummary(data.summary));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const setFoodRegisters = (registers) => ({
	type: types.setFoodRegisters,
	payload: registers,
});

export const deleteFoodRegister = (foodRegisterId) => {
	return {
		type: types.deleteFoodRegister,
		payload: foodRegisterId,
	};
};

export const newFoodRegister = (food) => ({
	type: types.registFood,
	payload: food,
});

export const setDateOfRegisters = (date) => ({
	type: types.setDateOfRegisters,
	payload: date,
});

export const setDateOfSummary = (date) => ({
	type: types.setDateOfSummary,
	payload: date,
});

export const setWeeklyCalories = (weeklyCalories) => ({
	type: types.setWeeklyCalories,
	payload: weeklyCalories,
});

export const setNutritionSummary = (summary) => ({
	type: types.setNutritionSummary,
	payload: summary,
});
