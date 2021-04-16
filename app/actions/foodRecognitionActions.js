import { clientAxios } from "../axios/clientAxios";
import FormData from "form-data";

export const startSendImage = (image) => {
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

			const { data } = await clientAxios.post(
				"/recognize-image",
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);
			console.log(data);
		} catch (e) {
			console.log(e);
			console.log(e.response);
		}
	};
};
