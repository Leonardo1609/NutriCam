import { clientAxios } from "../axios/clientAxios";

export const startCreateUser = () => {
	return async (dispatch, getState) => {
		const { dataToRegist } = getState().createAccountProcess;
		console.log( dataToRegist );
		const dataToSend = {
			user_name: dataToRegist.username,
			user_email: dataToRegist.email,
			user_pass: dataToRegist.password,
			profile_genre: dataToRegist.genre,
			profile_height: dataToRegist.height,
			profile_actual_weight: dataToRegist.actualWeigth,
			profile_birthdate: dataToRegist.birthdate,
			profile_activity_level: dataToRegist.activityLevel,
		};

		try {
			const { data } = await clientAxios.post("/regist-user", dataToSend);
			console.log(data);
		} catch (e) {
			console.log(e.message);
		}
	};
};
