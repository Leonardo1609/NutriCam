import { types } from "../types/types";

const authState = {
	authenticated: false,
	userInformation: null,
};

export const authReducer = (state = authState, { type, payload }) => {
	switch (type) {
		case types.setUserInformation:
			return {
				...state,
				userInformation: payload,
				authenticated: true,
			};
		case types.logout:
			return {
				userInformation: null,
				authenticated: false,
			};
		default:
			return state;
	}
};
