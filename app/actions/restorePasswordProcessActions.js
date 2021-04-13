import { clientAxios } from "../axios/clientAxios";
import { types } from "../types/types";
import { setMessageSuccess, setMessageWarning } from "./uiActions";

export const startSendEmailToRestorePassword = (email, fn = null) => {
	return async (dispatch) => {
		try {
			const { data } = await clientAxios.post(`/recovery-code/${email}`);

			dispatch(setEmailSended(email));

			dispatch(setMessageSuccess(data.msg));

			if (fn) fn();

			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 5000);
		} catch (e) {
			console.log(e.response);
			dispatch(setMessageWarning(e.response.data.msg));
		}
	};
};

export const startSendRecoveryCode = (email, code, fn) => {
	return async (dispatch) => {
		try {
			const dataToSend = {
				recovery_code: code,
			};
			const { data } = await clientAxios.post(
				`/success-code/${email}`,
				dataToSend
			);

			dispatch(setMessageWarning(null));
			dispatch(setMessageSuccess(data.msg));

			if (fn) fn();

			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 5000);
		} catch (e) {
			console.log(e.response);
			dispatch(setMessageWarning(e.response.data.msg));
		}
	};
};

export const startNewPassword = (email, newPassword, fn) => {
	return async (dispatch) => {
		try {
			const dataToSend = {
				new_password: newPassword,
			};
			const { data } = await clientAxios.put(
				`/restore-password/${email}`,
				dataToSend
			);

			dispatch(setMessageWarning(null));
			dispatch(setMessageSuccess(data.msg));

			if (fn) fn();

			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 5000);
		} catch (e) {
			console.log(e.response);
		}
	};
};

export const setEmailSended = (email) => ({
	type: types.emailSended,
	payload: email,
});
