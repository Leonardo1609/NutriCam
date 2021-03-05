import { createStore, combineReducers, applyMiddleware } from "redux";
import { createAccountProcessReducer } from "../reducers/createAccountProcessReducer";
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
	createAccountProcess: createAccountProcessReducer,
	auth: authReducer,
	ui: uiReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
