import { types } from "../types/types";

const initialState = {
	dateFirstUserCreated: null,
	usersQuantity: {
		withCaloricPlan: 0,
		withoutCaloricPlan: 0,
		total: 0,
	},
};

export const administratorReducer = (
	state = initialState,
	{ type, payload }
) => {
	switch (type) {
		case types.setFirstDate:
			return {
				...state,
				dateFirstUserCreated: payload
			}
		case types.setQuantityUsers:
			return {
				...state,
				usersQuantity: payload,
			};
		default:
			return state;
	}
};
