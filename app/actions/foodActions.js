import { clientAxios } from "../axios/clientAxios";
import { errorMessageLogoutAction } from "../helpers/helpers";
import { types } from "../types/types";
import { setMessageSuccess, setMessageWarning } from "./uiActions";

export const startSearchFood = (foodInput) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get(`/search/${foodInput}`);
			dispatch(setFoodsFound(data.foods_found, foodInput));
		} catch (e) {
			console.log(e.response);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

const getFoodInformartion = async (foodId, measureUnitId = null) => {
	if (measureUnitId) {
		const { data } = await clientAxios.get(
			`/food/${foodId}/${measureUnitId}`
		);
		return data;
	} else {
		const { data } = await clientAxios.get(`/own-food/${foodId}`);
		return data;
	}
};

export const startGetFoodMeasureUnits = (foodId) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get(`/measure-units/${foodId}`);
			dispatch(setMeasureUnits(data.measure_units));
		} catch (e) {
			console.log(e.response);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const startGetFoodInformation = (
	foodId,
	measureUnitId = null,
	fn = null
) => {
	return async (dispatch) => {
		try {
			const { food_information } = await getFoodInformartion(
				foodId,
				measureUnitId
			);
			dispatch(setActiveFoodToRegist(food_information));

			if (fn) fn();
		} catch (e) {
			console.log("startGetOwnFoodInformation", e.response);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const startGetOwnFoodInformation = (foodId, fn = null) => {
	return async (dispatch) => {
		try {
			const { food_information } = await getFoodInformartion(foodId);
			dispatch(setActiveOwnFood(food_information));
			if (fn) fn();
		} catch (e) {
			console.log(e.response);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const getOwnFoods = () => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get("/own-foods");
			dispatch(setOwnFoods(data.own_foods));
		} catch (e) {
			console.log(e.response);
			errorMessageLogoutAction(e.response, dispatch);
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
			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				errorMessageLogoutAction(e.response, dispatch);
			} else {
				dispatch(setMessageWarning(e.response.data.msg));
				setTimeout(() => {
					dispatch(setMessageWarning(null));
				}, 2000);
			}
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
			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				errorMessageLogoutAction(e.response, dispatch);
			} else {
				dispatch(setMessageWarning(e.response.data.msg));
				setTimeout(() => {
					dispatch(setMessageWarning(null));
				}, 2000);
			}
		}
	};
};

export const startRemoveOwnfood = (foodId, fn = null) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.put(`/remove-food/${foodId}`);
			dispatch(removeOwnFood(foodId));
			if (fn) fn();
			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			console.log(e.response);
			if (e.response.status === 401) {
				errorMessageLogoutAction(e.response, dispatch);
			} else {
				dispatch(setMessageWarning(e.response.data.msg));
				setTimeout(() => {
					dispatch(setMessageWarning(null));
				}, 2000);
			}
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

export const setMeasureUnits = (measureUnits) => ({
	type: types.setMeasureUnits,
	payload: measureUnits,
});
