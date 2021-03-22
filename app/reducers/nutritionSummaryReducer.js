import { types } from "../types/types";
import { formatDate } from "../helpers/helpers";

const initialState = {
	dateOfRegister: formatDate(new Date()),
	dateOfSummary: formatDate(new Date()),
	foodRegisters: [],
	weeklyCalories: [],
	nutritionSummary: [],
};

export const nutritionSummaryReducer = (
	state = initialState,
	{ type, payload }
) => {
	switch (type) {
		case types.setFoodRegisters:
			return {
				...state,
				foodRegisters: payload,
			};
		case types.deleteFoodRegister:
			return {
				...state,
				foodRegisters: state.foodRegisters.filter(
					(food) => food.food_register_id !== payload
				),
			};
		case types.registFood:
			return {
				...state,
				foodRegisters: [...state.foodRegisters, payload],
			};
		case types.setDateOfRegisters:
			return {
				...state,
				dateOfRegister: payload,
			};
		case types.setWeeklyCalories:
			return {
				...state,
				weeklyCalories: payload,
			};
		case types.setNutritionSummary:
			return {
				...state,
				nutritionSummary: payload,
			};
		case types.setDateOfSummary:
			return {
				...state,
				dateOfSummary: payload,
			};

		default:
			return state;
	}
};
