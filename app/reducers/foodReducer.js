import { types } from "../types/types";
const initialState = {
	activeFoodToRegist: null,
	foodSearchInput: "",
	foodsFound: [],
	ownFoods: [],
	activeOwnFood: null,
};

export const foodReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.searchFood:
			return {
				...state,
				foodsFound: payload.foodsFound,
				foodSearchInput: payload.foodInput,
			};
		case types.activeFood:
			return {
				...state,
				activeFoodToRegist: payload,
			};
		case types.registFood:
			return {
				...state,
				activeFoodToRegist: null,
				foodSearchInput: "",
				foodsFound: [],
			};
		case types.setOwnFoods:
			return {
				...state,
				ownFoods: payload,
			};
		case types.createFood:
			return {
				...state,
				ownFoods: [payload, ...state.ownFoods],
			};
		case types.updateOwnFood:
			return {
				...state,
				ownFoods: state.ownFoods.map((food) => {
					if (food.food_id === payload.food_id) {
						return payload;
					} else {
						return food;
					}
				}),
			};
		case types.setActiveOwnFood:
			return {
				...state,
				activeOwnFood: payload,
			};
		case types.removeOwnFood:
			return {
				...state,
				ownFoods: state.ownFoods.filter(
					(food) => food.food_id !== payload
				),
			};
		default:
			return state;
	}
};
