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

			const { data } = await clientAxios.post("/statistics", dataToSend);

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
			console.log(e.response);
		}
	};
};

export const startGetQuantityReviewsPerRating = (initialDate, lastDate) => {
	return async (dispatch) => {
		try {
			const dataToSend = {
				initial_date: initialDate,
				last_date: lastDate,
			};

			const { data } = await clientAxios.post(
				"/quantity-rating",
				dataToSend
			);

			let reviewsPerRating = [];
			for (let i = 1; i <= 5; i++) {
				const ratingQuantity = data.quantity_reviews_ratings_per_rating.find(
					(item) => item.rating === i
				);

				if (ratingQuantity) {
					reviewsPerRating.push(ratingQuantity);
				} else {
					reviewsPerRating.push({
						rating: i,
						quantity: 0,
					});
				}
			}

			dispatch(setQuantityReviewsPerRating(reviewsPerRating));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startGetReviewsPerRating = (
	initialDate = null,
	lastDate = null,
	rating = null
) => {
	return async (dispatch) => {
		try {
			const dataToSend = {
				initial_date: initialDate,
				last_date: lastDate,
				rating,
			};

			const { data } = await clientAxios.post(
				"/reviews-per-rating",
				dataToSend
			);

			dispatch(setReviewsPerRating(data.reviews_ratings));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const startGetFirstReviewDate = () => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get("/first-review-date");
			dispatch(setFirstReviewDate(data.first_review_date));
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const setQuantityReviewsPerRating = (data) => ({
	type: types.setQuantityReviewsPerRating,
	payload: data,
});

export const setUsersQuantity = (usersQuantity) => ({
	type: types.setQuantityUsers,
	payload: usersQuantity,
});

export const setFirstDate = (date) => ({
	type: types.setFirstDate,
	payload: date,
});

export const setFirstReviewDate = (date) => ({
	type: types.setFirstReviewDate,
	payload: date,
});

export const setReviewsPerRating = (reviewsPerRating) => ({
	type: types.setReviewsPerRating,
	payload: reviewsPerRating,
});
