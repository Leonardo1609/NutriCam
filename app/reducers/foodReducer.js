import { types } from '../types/types';
const initialState = {
	activeFoodToRegist: null,
	foodSearchInput: '',
	foodsFound: []
}

export const foodReducer = ( state = initialState, { type, payload } ) => {
	switch( type ){
		case types.searchFood:
			return {
				...state,
				foodsFound: payload.foodsFound,
				foodSearchInput: payload.foodInput
			}
		case types.activeFood:
			return {
				...state,
				activeFoodToRegist: payload
			}
		default:
			return state;
	}
};
