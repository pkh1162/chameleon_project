import {ITEMS_HAS_ERRORED, ITEMS_FETCH_DATA_SUCCESS} from "../actions/popularNewsItem.js";

export function itemHasErrored(state=false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;
            
        default:
            return state;
    }
}

export function items(state={articles:[], itemsHasErrored: false}, action) {
   // debugger;
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;
            
        default:
            return state;
    }
}

