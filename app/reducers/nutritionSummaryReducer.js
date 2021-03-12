import { types } from "../types/types";

const initialState = {
	foodRegisters: [],
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
		default:
			return state;
	}
};
