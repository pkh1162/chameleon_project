import {REQUEST_SEARCH, RETREIVED_SEARCH, CLEAR_SEARCH_RESULTS, UPDATE_SEARCH_TERM, UPDATE_WORLD_SEARCH} from "../actions/searchBarAsync.js";

const defaultState = {
    searchResults : [],
    searchTerm : "",
    citySearch: "",
    countrySearch: "",
    isLoading : false,
    chunkedResults: [],
    city: "",
    country: ""
}


const searchBarReducer = (state=defaultState, action) => {
    switch (action.type) {
        case REQUEST_SEARCH :
            return {...state, searchTerm : action.searchWord, isLoading : true};
        case RETREIVED_SEARCH :
            if (action.searchResults.length === 0)
                action.searchResults = [{headline : {main : "Sorry, no search results"}}]
            return {...state, searchResults : action.searchResults, isLoading : false};
        case CLEAR_SEARCH_RESULTS : 
            return {...state, searchResults : [], isLoading: false}
        case UPDATE_SEARCH_TERM : 
            return {...state, searchTerm : action.searchTerm}
        case UPDATE_WORLD_SEARCH : 
            return {...state, citySearch : action.city, countrySearch: action.country}
        default : 
            return {...state};
    }

}

export default searchBarReducer;