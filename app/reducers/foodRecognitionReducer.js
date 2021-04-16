import { types } from "../types/types";

const initialState = {
	image: null,
	posibleOptions: [],
};
export const foodRecognitionReducer = (
	state = initialState,
	{ type, payload }
) => {
	switch (type) {
		case types.setFoodImage:
			return {
				...state,
				image: payload,
			};
		case types.setPosibleOptions:
			return {
				...state,
				posibleOptions: payload,
			};
		default:
			return state;
	}
};
