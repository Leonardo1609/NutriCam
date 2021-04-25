import { types } from "../types/types";

const initialState = {
	image: null,
	posibleOptions: [],
	loadingRecognition: false,
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
		case types.setLoadingRecognition:
			return {
				...state,
				loadingRecognition: payload,
			};
		default:
			return state;
	}
};
