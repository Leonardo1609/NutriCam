import { types } from "../types/types";

const authState = {
	authenticated: false,
	userInformation: null,
};

export const authReducer = (state = authState, { type, payload }) => {
	switch (type) {
		case types.login:
		case types.createAccount:
			localStorage.setItem('token', payload.token);
			return {
				...state,
				authenticated: true,
			};
		case types.setUserInformation:
			return {
				...state,
				userInformation: payload
			}
		case types.logout: 
			localStorage.removeItem('token');
			return {
				userInformation: null,
				authenticated: false
			}
		default:
			return state;
	}
};
