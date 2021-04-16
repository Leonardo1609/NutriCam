import { clientAxios } from "../axios/clientAxios";
import { types } from "../types/types";
import { setMessageSuccess } from "./uiActions";

export const startConfigSchedule = (scheduleToSend) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.post("/config-schedule", {
				schedule: scheduleToSend,
			});

			dispatch(setMessageSuccess(data.msg));
			dispatch(setSchedule(data.schedule));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 4000);
			dispatch(setSchedule(data.schedule));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startUpdateSchedule = (scheduleToSend) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.put("/config-schedule", {
				schedule: scheduleToSend,
			});
			dispatch(setMessageSuccess(data.msg));
			dispatch(setSchedule(data.schedule));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 4000);
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startGetSchedule = () => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get("get-config-schedule");
			dispatch(setSchedule(data.schedule));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const setSchedule = (schedule) => ({
	type: types.setSchedule,
	payload: schedule,
});
