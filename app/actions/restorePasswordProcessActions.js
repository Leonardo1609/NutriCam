import { clientAxios } from "../axios/clientAxios";
import { types } from "../types/types";
import {
	setLoadingRegister,
	setMessageSuccess,
	setMessageWarning,
} from "./uiActions";
import { formatDate, formatHour } from "../helpers/helpers";

export const startSendEmailToRestorePassword = (email, fn = null) => {
	return async (dispatch) => {
		const today = new Date();
		const current_day_and_hour = `${formatDate(today)} ${formatHour(
			today.getHours(),
			today.getMinutes()
		)}`;

		try {
			const dataToSend = {
				current_day_and_hour,
			};
			dispatch(setLoadingRegister(true));
			const { data } = await clientAxios.post(
				`/recovery-code/${email.trim()}`,
				dataToSend
			);

			dispatch(setEmailSended(email.trim()));

			dispatch(setMessageSuccess(data.msg));
			if (fn) fn();

			dispatch(setLoadingRegister(false));

			setTimeout(() => {
				dispatch(setMessageSuccess(null));
			}, 5000);
		} catch (e) {
			console.log(e.response);

			dispatch(setLoadingRegister(false));
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
				`/success-code/${email.trim()}`,
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
				`/restore-password/${email.trim()}`,
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
	payload: email.trim(),
});
