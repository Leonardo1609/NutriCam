import { createStore, combineReducers, applyMiddleware } from "redux";
import { createAccountProcessReducer } from "../reducers/createAccountProcessReducer";
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import { nutritionSummaryReducer } from "../reducers/nutritionSummaryReducer";
import thunk from "redux-thunk";
import { foodReducer } from "../reducers/foodReducer";
import { reviewRatingReducer } from "../reducers/reviewRatingReducer";
import { restorePasswordProccesReducer } from "../reducers/restorePasswordProcessReducer";
import { scheduleReducer } from "../reducers/scheduleReducer";
import { foodRecognitionReducer } from "../reducers/foodRecognitionReducer";

const rootReducer = combineReducers({
	createAccountProcess: createAccountProcessReducer,
	auth: authReducer,
	ui: uiReducer,
	nutritionSummary: nutritionSummaryReducer,
	food: foodReducer,
	reviewRating: reviewRatingReducer,
	restorePasswordProcess: restorePasswordProccesReducer,
	schedule: scheduleReducer,
	foodRecognition: foodRecognitionReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
