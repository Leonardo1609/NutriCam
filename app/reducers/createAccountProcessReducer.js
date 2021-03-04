import { types } from "../types/types";

const initiliaState = {
	dataToRegist: {
		username: "",
		email: "",
		password: "",
		birthdate: null,
		height: null,
		genre: null,
		actualWeigth: null,
		activityLevel: null,
	},
	informationToShow: {
		posibleDiseases: [],
		profileCaloricPlan: 0,
		profileIdealWeight: 0,
		profileIMC: 0,
		weightLevelName: "",
	},
};

export const createAccountProcessReducer = (
	state = initiliaState,
	{ type, payload }
) => {
	switch (type) {
		case types.setBasicData:
			return {
				...state,
				dataToRegist: {
					username: payload.username,
					email: payload.email,
					password: payload.password,
				},
			};
		case types.setHealthyData:
			return {
				...state,
				dataToRegist: {
					...state.dataToRegist,
					birthdate: payload.birthdate,
					height: payload.height,
					genre: payload.genre,
					actualWeigth: payload.actualWeigth,
					activityLevel: payload.activityLevel,
				},
			};
		case types.showHealthyInformation:
			return {
				...state,
				informationToShow: {
					posibleDiseases: payload.posible_diseases,
					profileCaloricPlan: payload.profile_caloric_plan,
					profileIdealWeight: payload.profile_ideal_weight,
					profileIMC: payload.profile_imc,
					weightLevelName: payload.w_level_name,
				},
			};
		default:
			return state;
	}
};
