import { clientAxios } from "../axios/clientAxios";
import { types } from "../types/types";

export const startGetDateFirstUserCreated = () => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get("/first-date");
			dispatch(setFirstDate(data.first_date));
		} catch (e) {
			console.log(e);
		}
	};
};
export const startGetUsersQuantity = (initialDate = null, lastDate = null) => {
	return async (dispatch) => {
		try {
			const dataToSend = {
				initial_date: initialDate,
				last_date: lastDate,
			};

			const { data } = await clientAxios.get("/statistics", dataToSend);

			const usersQuantity = {
				withCaloricPlan: data.quantity_users.users_with_caloric_plan,
				withoutCaloricPlan:
					data.quantity_users.users_without_caloric_plan,
				total:
					data.quantity_users.users_with_caloric_plan +
					data.quantity_users.users_without_caloric_plan,
			};
			dispatch(setUsersQuantity(usersQuantity));
		} catch (e) {
			console.log(e);
		}
	};
};

export const setUsersQuantity = (usersQuantity) => ({
	type: types.setQuantityUsers,
	payload: usersQuantity,
});

export const setFirstDate = (date) => ({
	type: types.setFirstDate,
	payload: date,
});
