import { types } from "../types/types";
import { clientAxios } from "../axios/clientAxios";
import { setMessageSuccess } from "./uiActions";
import { errorMessageLogoutAction } from "../helpers/helpers";

export const startGetReviewRating = () => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.get("/review-rating");
			dispatch(setReviewRating(data.review_rating));
		} catch (e) {
			console.log(e.response);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const startPostReviewRating = (rating, review) => {
	return async (dispatch) => {
		try {
			const reviewRatingToSend = {
				rating,
				review,
			};

			const { data } = await clientAxios.post(
				"/review-rating",
				reviewRatingToSend
			);

			dispatch(
				setReviewRating({
					review_rating_id: data.review_rating_id,
					...reviewRatingToSend,
				})
			);
			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			console.log(e.response);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const startModifyReviewRating = (review_rating_id, rating, review) => {
	return async (dispatch) => {
		try {
			const reviewRatingModifiedToSend = {
				rating,
				review,
			};

			const { data } = await clientAxios.put(
				"/review-rating",
				reviewRatingModifiedToSend
			);

			dispatch(
				setReviewRating({
					review_rating_id: review_rating_id,
					...reviewRatingModifiedToSend,
				})
			);

			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			console.log(e.response);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const startDeleteReviewRating = () => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.delete("/review-rating");
			dispatch(deleteReviewRating());
			dispatch(setMessageSuccess(data.msg));
			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 2000);
		} catch (e) {
			console.log(e.response);
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const setReviewRating = (reviewRating) => ({
	type: types.setReviewRating,
	payload: reviewRating,
});

export const deleteReviewRating = () => ({
	type: types.deleteReviewRating,
});
