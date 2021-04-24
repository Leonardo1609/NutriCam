import { types } from "../types/types";

const initialState = {
	dateFirstUserCreated: null,
	dateFirstReview: null,
	quantityReviewsPerRating: [],
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
				dateFirstUserCreated: payload,
			};
		case types.setQuantityUsers:
			return {
				...state,
				usersQuantity: payload,
			};
		case types.setQuantityReviewsPerRating:
			return {
				...state,
				quantityReviewsPerRating: payload,
			};
		case types.setFirstReviewDate:
			return {
				...state,
				dateFirstReview: payload,
			};
		default:
			return state;
	}
};
