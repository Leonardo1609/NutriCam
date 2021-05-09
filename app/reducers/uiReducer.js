import { types } from "../types/types";

const initialState = {
	loading: false,
	loadingLoginUser: false,
	messageWarning: null,
	messageSuccess: null,
	showRegisterModal: false,
	loadingSendingMessage: false,
};

export const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.loadingUserInfo:
			return {
				...state,
				loading: payload,
			};
		case types.loadingLoginUser:
			return {
				...state,
				loadingLoginUser: payload,
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
		case types.setLoadingSendingMessage:
			return {
				...state,
				loadingSendingMessage: payload,
			};

		default:
			return state;
	}
};
