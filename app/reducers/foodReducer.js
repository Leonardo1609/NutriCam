import { types } from '../types/types';
const initialState = {
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
		default:
			return state;
	}
};
