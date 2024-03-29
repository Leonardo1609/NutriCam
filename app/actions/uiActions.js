import { types } from "../types/types";

export const loadingUserInfo = (bool) => ({
	type: types.loadingUserInfo,
	payload: bool,
});

export const loadingLoginUser = (bool) => ({
	type: types.loadingLoginUser,
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

export const setLoadingRegister = (bool) => ({
	type: types.setLoadingSendingMessage,
	payload: bool,
});
