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

export const startGetFoodInformation = (foodId, fn = null) => {
	return async (dispatch) => {
		try {
			const { food_information } = await getFoodInformartion(foodId);
			dispatch(setActiveFoodToRegist(food_information));

			if (fn) fn();
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startGetOwnFoodInformation = (foodId, fn = null) => {
	return async (dispatch) => {
		const { food_information } = await getFoodInformartion(foodId);
		dispatch(setActiveOwnFood(food_information));

		if (fn) fn();
	};
};

export const getOwnFoods = () => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get("/own-foods");
			dispatch(setOwnFoods(data.own_foods));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startCreateFood = (foodInfo, fn = null) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.post("/create-food", foodInfo);
			dispatch(
				setNewFood({ food_id: data.food_created_id, ...foodInfo })
			);
			if (fn) fn();
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startUpdateOwnFood = (foodId, foodInfo, fn = null) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.put(
				`/update-food/${foodId}`,
				foodInfo
			);
			dispatch(setUpdatedFood({ food_id: foodId, ...foodInfo }));
			if (fn) fn();
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startRemoveOwnfood = (foodId, fn = null) => {
	return async (dispatch) => {
		try {
			await clientAxios.put(`/remove-food/${foodId}`);
			dispatch(removeOwnFood(foodId));
			if (fn) fn();
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

export const setOwnFoods = (ownFoods) => ({
	type: types.setOwnFoods,
	payload: ownFoods,
});

export const setNewFood = (food) => ({
	type: types.createFood,
	payload: food,
});

export const setUpdatedFood = (food) => ({
	type: types.updateOwnFood,
	payload: food,
});

export const removeOwnFood = (foodId) => ({
	type: types.removeOwnFood,
	payload: foodId,
});

export const setActiveOwnFood = (food) => ({
	type: types.setActiveOwnFood,
	payload: food,
});
