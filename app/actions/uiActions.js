import { types } from "../types/types";

export const loadingUserInfo = (bool) => ({
	type: types.loadingUserInfo,
	payload: bool,
});

export const setMessageWarning = (message) => ({
	type: types.messageWarning,
	payload: message,
});

export const setMessageSuccess = (message) => ({
	type: types.messageSuccess,
	payload: message,
});

export const setShowRegisterModal = (bool) => ({
	type: types.showRegisterModal,
	payload: bool,
});
