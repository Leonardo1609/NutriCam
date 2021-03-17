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
			console.log(e.response);
		}
	};
};

export const startRegistFood = (
	day_food_id,
	food_measure_unit_id,
	food_id,
	food_name,
	quantity,
	calories
) => {
	return async (dispatch) => {
		const dataToSend = {
			day_food_id,
			food_measure_unit_id,
			food_id,
			quantity,
		};

		try {
			const { data } = await clientAxios.post("/regist-food", dataToSend);
			const foodObject = {
				food_register_id: data.food_register_id,
				day_food_id,
				food_name,
				calories,
			};
			console.log( 'foodObject', foodObject )

			dispatch( newFoodRegister( foodObject ) )


		} catch (e) {
			console.log(e.response);
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
			console.log(e.response);
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
	};
};

export const newFoodRegister = ( food ) => ({
	type: types.registFood,
	payload: food
})
