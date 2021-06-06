import FormData from "form-data";
import axios from "axios";
import { clientAxios } from "../axios/clientAxios";
import { errorMessageLogoutAction } from "../helpers/helpers";
import { recognizeapi_url } from "../environment/environment";
import { types } from "../types/types";

export const startSendImage = (image, fn) => {
	return async (dispatch) => {
		try {
			const formData = new FormData();
			let imageUri = image.uri;
			let filename = imageUri.split("/").pop();
			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : "image";

			formData.append("image", {
				uri: imageUri,
				name: filename,
				type: type,
			});

			dispatch(setLoadingRecognition(true));
			const { data } = await axios.post(recognizeapi_url, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			dispatch(setLoadingRecognition(false));
			dispatch(setFoodImage(image));
			dispatch(setPosibleOptions(data.recognized_foods));
			if (fn) fn();
		} catch (e) {
			console.log(e.response);
			dispatch(setLoadingRecognition(false));
			errorMessageLogoutAction(e.response, dispatch);
		}
	};
};

export const getFoodId = async (foodName) => {
	const { data } = await clientAxios.get(`/food-id/${foodName}`);
	return { foodId: data.food_id };
};

export const setFoodImage = (image) => ({
	type: types.setFoodImage,
	payload: image,
});

export const setPosibleOptions = (options) => ({
	type: types.setPosibleOptions,
	payload: options,
});

export const setLoadingRecognition = (bool) => ({
	type: types.setLoadingRecognition,
	payload: bool,
});
