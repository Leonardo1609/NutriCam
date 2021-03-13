import { clientAxios } from "../axios/clientAxios";
import { types } from '../types/types';

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

export const setFoodsFound = (foodsFound, foodInput) => ({
	type: types.searchFood,
	payload: { foodsFound, foodInput }
});
