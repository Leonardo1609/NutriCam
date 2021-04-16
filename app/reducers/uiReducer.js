import { types } from "../types/types";

const initialState = {
	loading: false,
	messageWarning: null,
	messageSuccess: null,
	showRegisterModal: false,
};

export const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.loadingUserInfo:
			return {
				...state,
				loading: payload,
			};
		case types.messageSuccess:
			return {
				...state,
				messageSuccess: payload,
			};
		case types.messageWarning:
			return {
				...state,
				messageWarning: payload,
			};
		case types.showRegisterModal:
			return {
				...state,
				showRegisterModal: payload,
			};
		default:
			return state;
	}
};
