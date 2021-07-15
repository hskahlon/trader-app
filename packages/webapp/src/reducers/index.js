import { combineReducers } from "redux";

import stockReducer from "./stock";
import authReducer from "./auth";

export const reducers = combineReducers({ stockReducer, authReducer });
