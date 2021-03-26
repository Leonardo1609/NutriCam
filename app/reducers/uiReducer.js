import { types } from "../types/types";

const initialState = {
	loading: false,
	messageWarning: null,
};
export const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.loadingUserInfo:
			return {
				...state,
				loading: payload,
			};
		case types.messageWarning:
			return {
				...state,
				messageWarning: payload,
			};
		default:
			return state;
	}
};
