import { types } from "../types/types";
import { clientAxios } from "../axios/clientAxios";

export const startGetFoodRegisters = (registerDay) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get(
				`/registers-per-day/${registerDay}`
			);
			dispatch(setFoodRegisters(data.food_registers));
		} catch (e) {
			console.log( e.response);
		}
	};
};

export const startDeleteFoodRegister = (foodRegisterId) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.delete(
				`/delete-regist/${foodRegisterId}`
			);

			dispatch(deleteFoodRegister(foodRegisterId));

		} catch (e) {
			console.log(e.response );
		}
	};
};

export const setFoodRegisters = (registers) => ({
	type: types.setFoodRegisters,
	payload: registers,
});

export const deleteFoodRegister = (foodRegisterId) => {
	return {
	type: types.deleteFoodRegister,
	payload: foodRegisterId,
		
}};
