import { clientAxios } from "../axios/clientAxios";
import { types } from "../types/types";

export const startSearchFood = (foodInput) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get(`/search/${foodInput}`);
			dispatch(setFoodsFound(data.foods_found, foodInput));
		} catch (e) {
			console.log(e.response);
		}
	};
};

const getFoodInformartion = async (foodId) => {
	const { data } = await clientAxios.get(`/food/${foodId}`);
	return data;
};

export const startGetFoodInformation = (foodId) => {
	return async (dispatch) => {
		try {
			const { food_information } = await getFoodInformartion(foodId);
			dispatch(setActiveFoodToRegist(food_information));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const setFoodsFound = (foodsFound, foodInput) => ({
	type: types.searchFood,
	payload: { foodsFound, foodInput },
});

export const setActiveFoodToRegist = (food) => ({
	type: types.activeFood,
	payload: food,
});
