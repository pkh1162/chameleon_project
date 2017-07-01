import {combineReducers} from "redux";

import multiNewsReducer from "./multiNewsReducer.js";
import searchBarReducer from "./searchBarReducer.js";
import { items, itemHasErrored } from "./popularNewsItemReducer.js";

export const rootReducer = combineReducers({
    multiNewsReducer,
    searchBarReducer,
    items,
    itemHasErrored
});