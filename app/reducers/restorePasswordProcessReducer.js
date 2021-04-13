import { types } from "../types/types";

const initialState = {
	email: "",
};

export const restorePasswordProccesReducer = (
	state = initialState,
	{ type, payload }
) => {
	switch (type) {
		case types.emailSended:
			return {
				email: payload,
			};

		default:
			return state;
	}
};
