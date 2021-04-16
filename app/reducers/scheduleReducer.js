import { types } from "../types/types";

const initialState = {
	schedule: [],
};

export const scheduleReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.setSchedule:
			return {
				schedule: payload,
			};
		default:
			return state;
	}
};
