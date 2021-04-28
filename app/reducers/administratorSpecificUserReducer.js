import { formatDate } from "../helpers/helpers";
import { types } from "../types/types";

const initialState = {
	dateOfUserRegister: formatDate(new Date()),
	dateOfUserSummary: formatDate(new Date()),
	foodUserRegisters: [],
	nutritionUserSummary: [],
};

export const administratorSpecificUserReducer = (
	state = initialState,
	{ type, payload }
) => {
	switch (type) {
		case types.setDateOfUserRegister:
			return {
				...state,
				dateOfUserRegister: payload,
			};
		case types.setDateOfUserSummary:
			return {
				...state,
				dateOfUserSummary: payload,
			};
		case types.setFoodUserRegisters:
			return {
				...state,
				foodUserRegisters: payload,
			};
		case types.setNutritionUserSummary:
			return {
				...state,
				nutritionUserSummary: payload,
			};
		default:
			return state;
	}
};
