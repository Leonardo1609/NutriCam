import { types } from "../types/types";

const initialState = {
	reviewRating: null,
};

export const reviewRatingReducer = (
	state = initialState,
	{ type, payload }
) => {
	switch (type) {
		case types.setReviewRating:
			return {
				reviewRating: payload,
			};
		case types.deleteReviewRating:
			return {
				reviewRating: null,
			};
		default:
			return state;
	}
};
