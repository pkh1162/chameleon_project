import {NYT_API_KEY} from "../apiKeys.js";

export const REQUEST_SEARCH = "REQUEST_SEARCH";
export const RETREIVED_SEARCH = "RETREIVED_SEARCH";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const UPDATE_SEARCH_TERM = "UPDATE_SEARCH_TERM";
export const UPDATE_WORLD_SEARCH = "UPDATE_WORLD_SEARCH";


export const clearSearchResults = () => {
    return {
        type : CLEAR_SEARCH_RESULTS
    }
}


export const requestSeacrh = (searchWord) => {
    return {
        type : REQUEST_SEARCH,
        searchWord 
    }
}

export const retreivedSearch = (searchResults) => {
    return {
        type : RETREIVED_SEARCH,
        searchResults
    }
}



export const updateWorldSearch = (city, country) => {
    return {
        type : UPDATE_WORLD_SEARCH,
        city,
        country
    }
}

export const updateSearchWord = (searchTerm) => {
    return {
        type : UPDATE_SEARCH_TERM,
        searchTerm
    }
}


export const getSearchResults = (searchTerm, loading) => {
    return (dispatch) => {
        dispatch(requestSeacrh(searchTerm));

        let headers = new Headers();
      
        let options = {
            method : "GET",
            headers : headers,
            mode : "cors"
        }

   

            fetch("http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + NYT_API_KEY + "&q=" + searchTerm, options)
            .then(res => {
                if (res.ok && res.status === 200){
                    return res.json()
                }
                throw new Error("Api request failed")
                
            })
            .then(data => {
                dispatch(retreivedSearch(data.response.docs))
            })
            .catch(e => {
                dispatch(clearSearchResults());
            })
          

        }

   

        
}


