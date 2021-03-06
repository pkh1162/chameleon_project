import {combineReducers} from "redux";

import multiNewsReducer from "./multiNewsReducer.js";
import searchBarReducer from "./searchBarReducer.js";

import meetupsReducer from "./meetupsReducer.js";
import { items, itemHasErrored } from "./popularNewsItemReducer.js";

export const rootReducer = combineReducers({
    multiNewsReducer,
    searchBarReducer,
    meetupsReducer,
    items,
    itemHasErrored
});