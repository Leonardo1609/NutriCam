import { types } from '../types/types';

export const loadingUserInfo = ( bool ) => ({
	type: types.loadingUserInfo,
	payload: bool
});