import {combineReducers} from "redux";

import multiNewsReducer from "./multiNewsReducer.js";
import searchBarReducer from "./searchBarReducer.js";


export const rootReducer = combineReducers({
    multiNewsReducer,
    searchBarReducer
});