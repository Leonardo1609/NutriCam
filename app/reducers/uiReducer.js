import { types } from "../types/types";

const initialState = {
	loading: false,
};
export const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.loadingUserInfo:
			return {
				loading: payload,
			};
		default:
			return state;
	}
};
