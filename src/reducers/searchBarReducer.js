import {REQUEST_SEARCH, RETREIVED_SEARCH, CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_TERM} from "../actions/searchBarAsync.js";

const defaultState = {
    searchResults : [],
    searchTerm : "",
    isLoading : false,
    chunkedResults: [],
    city: "",
    country: ""
}


const searchBarReducer = (state=defaultState, action) => {
    switch (action.type) {
        case REQUEST_SEARCH :
            //console.log("in request search") 
            return {...state, searchTerm : action.searchWord, isLoading : true};
        case RETREIVED_SEARCH :
            //console.log("in retreived search: ", state)
            if (action.searchResults.length === 0)
                action.searchResults = [{headline : {main : "Sorry, no search results"}}]
            return {...state, searchResults : action.searchResults, isLoading : false};
        case CLEAR_SEARCH_RESULTS : 
            //console.log("in clear search results, reducer")
            return {...state, searchResults : [], isLoading: false}
        case UPDATE_SEARCH_TERM : 
            return {...state, searchTerm : action.searchTerm}
        default : 
            return {...state};
    }

}

export default searchBarReducer;