import { types } from "../types/types";
import { clientAxios } from "../axios/clientAxios";

export const setBasicData = (username, email, password) => ({
	type: types.setBasicData,
	payload: { username, email, password },
});

export const setHealthyData = (
	birthdate,
	height,
	genre,
	actualWeigth,
	activityLevel
) => ({
	type: types.setHealthyData,
	payload: { birthdate, height, genre, actualWeigth, activityLevel },
});

export const getHealthyInformation = () => {
	return async (dispatch, getState) => {
		const userDataBeforeToRegist = getState().createAccountProcess
			.dataToRegist;
		const {
			genre,
			height,
			actualWeigth,
			birthdate,
			activityLevel,
		} = userDataBeforeToRegist;
		const dataToSend = {
			profile_genre: genre,
			profile_height: height,
			profile_actual_weight: actualWeigth,
			profile_birthdate: birthdate,
			profile_activity_level: activityLevel,
		};

		try {
			const resp = await clientAxios.post("/information", dataToSend);
			dispatch(showHealthyInformation(resp.data.information));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const showHealthyInformation = (healthyInformation) => ({
	type: types.showHealthyInformation,
	payload: healthyInformation,
});
